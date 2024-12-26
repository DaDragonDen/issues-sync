import { Client } from "oceanic.js";
import core from "@actions/core";
import github from "@actions/github";
import { App } from "octokit";

try {

  // Authenticate as an installation to get the app token.
  const app = new App({
    appId: core.getInput("github-app-id", {required: true}),
    privateKey: core.getInput("github-app-private-key", {required: true})
  });
  
  const installationID = parseInt(core.getInput("github-app-installation-id", {required: true}), 10);
  const octokit = await app.getInstallationOctokit(installationID); // Get the installation ID from the GitHub app settings.

  // Get the issue title.
  const issuePayload = github.context.issue;
  const { data: issue } = await octokit.request(`GET /repos/{owner}/{repo}/issues/{issue_number}`, {
    issue_number: issuePayload.number,
    owner: issuePayload.owner,
    repo: issuePayload.repo
  });

  const fieldName = core.getInput("field-name", {required: false});
  const discordToken = core.getInput("discord-token", {required: true});
  const discordChannelID = core.getInput("discord-channel-id", {required: true});
  const projectIDString = core.getInput("project-id", {required: false});
  const projectID = parseInt(projectIDString, 10);
  const client = new Client({auth: `Bot ${discordToken}`});
  await client.restMode(true);

  async function getProjectItemQueryResponse() {

    return await octokit.graphql<{
      repository: {
        issue: {
          id: string;
          projectV2: {
            id: string;
            field: {
              id: string;
            },
            items: {
              nodes: {
                id: string,
                fieldValueByName?: {
                  text: string;
                }
                content: {
                  id: string
                }
              }[]
            }
          }
        }
      }
    }>(`
      query getProjectItem($name: String!, $owner: String!, $projectID: Int!, $issueNumber: Int!, $fieldName: String!) {
        repository(name: $name, owner: $owner) {
          issue(number: $issueNumber) {
            id
            projectV2(number: $projectID) {
              id
              field(name: $fieldName) {
                ... on ProjectV2Field {
                  id
                }
              }
              items {
                nodes {
                  id
                  fieldValueByName(name: $fieldName) {
                    ... on ProjectV2ItemFieldTextValue {
                      text
                    }
                  }
                  content {
                    ... on Issue {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    `, {
      name: issuePayload.repo,
      owner: issuePayload.owner,
      projectID,
      issueNumber: issuePayload.number,
      fieldName
    });

  }

  async function getDiscussionLink() {

    const response = await getProjectItemQueryResponse();
    const nodes = response.repository.issue.projectV2.items.nodes;
    const targetNodeID = response.repository.issue.id;
    const item = nodes.find((node) => node.content.id === targetNodeID);
    const discussionLink = item?.fieldValueByName?.text;
    return discussionLink;

  }

  const githubActionType = github.context.payload.action;
  switch (githubActionType) {

    case "opened":
    case "edited": {

      if (!fieldName) throw new Error("A field name must be provided to search for an existing discussion thread on Discord.");

      // Get the discussion link from GitHub.
      const response = await getProjectItemQueryResponse();
      const nodes = response.repository.issue.projectV2.items.nodes;
      const targetNodeID = response.repository.issue.id;
      const item = nodes.find((node) => node.content.id === targetNodeID);
      const discussionLink = item?.fieldValueByName?.text;
      const discordMessage = {
        embeds: [
          {
            ... issue.user?.login ? {
              author: {
                name: `${issue.user.name ? `${issue.user.name} (` : ""}${issue.user.login}${issue.user.name ? ")" : ""}`,
                url: issue.user.html_url,
                iconURL: issue.user.avatar_url
              }
            } : {},
            title: issue.title,
            url: issue.html_url,
            ... issue.body ? {
              description: issue.body
            } : {},
            fields: [
              {
                name: "Repository",
                value: `[${issuePayload.owner}/${issuePayload.repo}](https://github.com/${issuePayload.owner}/${issuePayload.repo})`
              },
              {
                name: "Issue",
                value: `${issue.number}`,
              }
            ]
          }
        ]
      };

      if (discussionLink) {

        // Verify the link is set up correctly.
        const discordLinkRegex = /discordapp\.com\/channels\/\d+\/(?<channelID>\d+)\/(?<messageID>\d+)/g;
        const discordThreadIDMatch = [...discussionLink.matchAll(discordLinkRegex)];
        const channelID = discordThreadIDMatch[0].groups?.channelID;
        const messageID = discordThreadIDMatch[0].groups?.messageID;
        if (!channelID) throw new Error("Channel ID not provided in link.");
        if (!messageID) throw new Error("Thread ID not provided in link.");

        // Edit the thread name if necessary.
        await client.rest.channels.edit(channelID, {
          name: issue.title
        });

        // Edit the existing message.
        await client.rest.channels.editMessage(channelID, messageID, discordMessage);

      } else {

        // Create a discussion link since it doesn't exist.
        // Create a thread referencing the GitHub issue.
        console.log("Creating Discord thread...");

        const thread = await client.rest.channels.startThreadInThreadOnlyChannel(discordChannelID, {
          name: issue.title,
          message: discordMessage
        });

        const threadMessageID = thread.lastMessageID;

        // Find the project item ID.
        if (projectID) {

          console.log("Updating Discord thread URL in project...");
          const response = await getProjectItemQueryResponse();
          const targetNodeID = response.repository.issue.id;
          const projectNodeID = response.repository.issue.projectV2.id;
          const nodes = response.repository.issue.projectV2.items.nodes;
          const item = nodes.find((node) => node.content.id === targetNodeID);
          const itemID = item?.id;
          const fieldID = response.repository.issue.projectV2.field.id;

          // Set the thread ID on the issue.
          await octokit.graphql(`
            mutation setItemFields($projectNodeID: ID!, $itemID: ID!, $fieldID: ID!, $threadJumpLink: String!) {
              updateProjectV2ItemFieldValue(
                input: {
                  projectId: $projectNodeID
                  itemId: $itemID
                  fieldId: $fieldID
                  value: {
                    text: $threadJumpLink
                  }
                }
              ) {
                projectV2Item {
                  id
                }  
              }
            }
          `, {projectNodeID, itemID, fieldID, threadJumpLink: `https://discordapp.com/channels/${thread.guildID}/${thread.id}/${threadMessageID}`});

        }

        break;

      }
      
      break;

    }

    case "unlocked":
    case "locked":
    case "opened":
    case "closed": {

      const discussionLink = await getDiscussionLink();
      if (!discussionLink) throw new Error("Discord discussion link missing.");

      const discordLinkRegex = /discordapp\.com\/channels\/\d+\/(?<channelID>\d+)\/(?<messageID>\d+)/g;
      const discordThreadIDMatch = [...discussionLink.matchAll(discordLinkRegex)];
      const channelID = discordThreadIDMatch[0].groups?.channelID;
      if (!channelID) throw new Error("Channel ID not provided in link.");
      await client.rest.channels.edit(channelID, {
        ... githubActionType === "closed" || githubActionType === "opened" ? {
          archived: githubActionType === "closed"
        } : {},
        ... githubActionType === "locked" || githubActionType === "unlocked" ? {
          locked: githubActionType === "locked"
        } : {}
      });

    }

    case "deleted": {

      const discussionLink = await getDiscussionLink();
      if (!discussionLink) throw new Error("Discord discussion link missing.");

      const discordLinkRegex = /discordapp\.com\/channels\/\d+\/(?<channelID>\d+)\/(?<messageID>\d+)/g;
      const discordThreadIDMatch = [...discussionLink.matchAll(discordLinkRegex)];
      const channelID = discordThreadIDMatch[0].groups?.channelID;
      if (!channelID) throw new Error("Channel ID not provided in link.");
      
      await client.rest.channels.delete(channelID, "Issue deleted.");

      break;

    }

    default:
      break;

  }

} catch (error) {

  console.error(error);
  core.setFailed(error instanceof Error ? error.message : "Unknown error.");

}