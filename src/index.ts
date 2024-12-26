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
            items: {
              nodes: {
                id: string,
                fieldValueByName?: {
                  text: string;
                  field: {
                    id: string;
                  }
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
              items {
                nodes {
                  id
                  fieldValueByName(name: $fieldName) {
                    ... on ProjectV2ItemFieldTextValue {
                      text
                      field {
                        ... on ProjectV2Field {
                          id
                        }
                      }
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

  switch (github.context.payload.action) {

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
            description: issue.body_text,
            fields: [
              {
                name: "Repository",
                value: `[${issuePayload.owner}/${issuePayload.repo}](${issue.repository_url})`,
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
        const discordThreadIDMatch = discussionLink.match(discordLinkRegex);
        const channelID = discordThreadIDMatch?.groups?.channelID;
        const messageID = discordThreadIDMatch?.groups?.messageID;
        if (!channelID) throw new Error("Channel ID not provided in link.");
        if (!messageID) throw new Error("Thread ID not provided in link.");

        // Edit the existing message.
        const message = await client.rest.channels.getMessage(channelID, messageID);
        await message.edit(discordMessage);

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
          const fieldID = item?.fieldValueByName?.field.id;

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
          `, {projectNodeID, itemID, fieldID, threadJumpLink: `https://discordapp.com/channels/${thread.guildID}/${discordChannelID}/${threadMessageID}`});

        }

        console.log("Successfully created issue.");
        break;

      }
      
      break;

    }

    default:
      break;

  }

} catch (error) {

  console.error(error);
  core.setFailed(error instanceof Error ? error.message : "Unknown error.");

}