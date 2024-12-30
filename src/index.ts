import { ChannelTypes, Client } from "oceanic.js";
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

  const fieldID = core.getInput("github-project-field-id", {required: true});
  const discordToken = core.getInput("discord-token", {required: true});
  const discordChannelID = core.getInput("discord-channel-id", {required: true});
  const projectItemID = core.getInput("github-project-item-id", {required: true});
  const projectID = core.getInput("github-project-id", {required: false});
  const client = new Client({auth: `Bot ${discordToken}`});
  await client.restMode(true);

  async function getFieldTextAndIssueType() {

    // Find the field name from the ID.
    const { node: { name: fieldName } } = await octokit.graphql<{
      node: {
        name: string
      }
    }>(`
      query getFieldName($fieldID: ID!) {
        node(id: $fieldID) {
          ... on ProjectV2Field {
            name
          }
        }
      }  
    `, {
      fieldID
    });

    // Get the response from GitHub.
    const response = await octokit.graphql<{
      node: {
        fieldValueByName?: {
          text?: string
        };
        content: {
          issueType?: {
            name?: string
          }
        }
      }
    }>(`
      query getProjectItem($projectItemID: ID!, $fieldName: String!) {
        node(id: $projectItemID) {
          ... on ProjectV2Item {
            fieldValueByName(name: $fieldName) {
              ... on ProjectV2ItemFieldTextValue {
                text
              }
            }
            content {
              ... on Issue {
                issueType {
                  name
                }
              }
            }
          }
        }
      }
    `, {
      projectItemID,
      fieldName,
      headers: {
        "GraphQL-Features": "issue_types"
      }
    });

    return {
      fieldText: response.node.fieldValueByName?.text,
      issueType: response.node.content.issueType?.name
    }

  }

  const githubActionType = github.context.payload.action;

  const { fieldText: discussionLink, issueType } = await getFieldTextAndIssueType();
  const discordUserMap = core.getInput("discord-user-map", {required: false})?.split("\n").map((row) => row.trim().split("="));
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
          },
          ... issue.assignees?.[0] ? [
            {
              name: `Assignee${issue.assignees.length > 1 ? "s" : ""}`,
              value: issue.assignees.map((assignee, index) => {

                const connection = discordUserMap?.find((pair) => parseInt(pair[0], 10) === assignee.id);
                const discordUserID = connection?.[1];
                return `${discordUserID ? `<@${discordUserID}>` : `[@${assignee.login}](${assignee.html_url})`}${issue.assignees?.[index + 1] ? "\n" : ""}`

              }).join()
            }
          ] : []
        ]
      }
    ],
    allowedMentions: {
      users: true
    }
  };

  async function getAppliedTags(channelID: string) {

    const appliedTags = [];

    if (issueType) {

      const channel = await client.rest.channels.get(channelID);
      if (channel?.type === ChannelTypes.GUILD_FORUM) {

        const tag = channel.availableTags.find((tag) => tag.name.toLowerCase() === issueType.toLowerCase());
        if (tag) appliedTags.push(tag.id);

      }

    }

    return appliedTags;

  }

  async function createDiscordThread() {

    // Create a discussion link since it doesn't exist.
    // Create a thread referencing the GitHub issue.
    console.log("Creating Discord thread...");

    const appliedTags = await getAppliedTags(discordChannelID);

    const thread = await client.rest.channels.startThreadInThreadOnlyChannel(discordChannelID, {
      name: issue.title,
      message: discordMessage,
      appliedTags
    });

    const threadMessageID = thread.lastMessageID;

    // Set the thread ID on the issue.
    console.log("Updating Discord thread URL in project...");

    await octokit.graphql(`
      mutation setItemFields($projectID: ID!, $projectItemID: ID!, $fieldID: ID!, $threadJumpLink: String!) {
        updateProjectV2ItemFieldValue(
          input: {
            projectId: $projectID
            itemId: $projectItemID
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
    `, {
      projectID, 
      projectItemID, 
      fieldID, 
      threadJumpLink: `https://discord.com/channels/${thread.guildID}/${thread.id}/${threadMessageID}`
    });

  }

  if (discussionLink) {
    
    const discordLinkRegex = /discord(app)?\.com\/channels\/\d+\/(?<channelID>\d+)\/(?<messageID>\d+)/g;
    const discordThreadIDMatch = [...discussionLink.matchAll(discordLinkRegex)];
    const channelID = discordThreadIDMatch[0]?.groups?.channelID;
    const messageID = discordThreadIDMatch[0]?.groups?.messageID;
    if (!channelID) throw new Error("Channel ID not provided in link.");
    if (!messageID) throw new Error("Thread ID not provided in link.");

    // Edit the existing message.
    await client.rest.channels.editMessage(channelID, messageID, discordMessage);

    switch (githubActionType) {

      case "unlocked":
      case "locked":
      case "closed":
      case "opened":
      case "edited": {

        // Verify the link is set up correctly.
        const thread = await client.rest.channels.get(channelID);

        // Edit the thread name if necessary.
        if (thread.type === ChannelTypes.PUBLIC_THREAD || thread.type === ChannelTypes.PRIVATE_THREAD) {

          const appliedTags = await getAppliedTags(thread.parentID);
          await thread.edit({
            name: issue.title,
            appliedTags,
            archived: !!issue.closed_at,
            locked: issue.locked
          });

        }
        
        break;

      }

      case "deleted": {
        
        await client.rest.channels.delete(channelID, "Issue deleted.");
        break;

      }

      default:
        break;

    }

  } else {

    await createDiscordThread();

  }

} catch (error) {

  console.error(error);
  core.setFailed(error instanceof Error ? error.message : "Unknown error.");

}