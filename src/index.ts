import { Client } from "oceanic.js";
import core from "@actions/core";
import github from "@actions/github";

try {

  // Get the issue title.
  const issuePayload = github.context.issue;
  const githubAccessToken = core.getInput("github-token", {required: true}); 
  const octokit = github.getOctokit(githubAccessToken);
  const { data: issue } = await octokit.rest.issues.get({
    issue_number: issuePayload.number,
    owner: issuePayload.owner,
    repo: issuePayload.repo
  });

  // Create a thread referencing the GitHub issue.
  console.log("Creating Discord thread...");
  const discordToken = core.getInput("discord-token", {required: true});
  const discordChannelID = core.getInput("discord-channel-id", {required: true});
  const issueCreator = issue.user;
  const client = new Client({auth: `Bot ${discordToken}`});
  
  const thread = await client.rest.channels.startThreadInThreadOnlyChannel(discordChannelID, {
    name: `[${issue.number}] ${issue.title}`,
    message: {
      embeds: [
        {
          ... issueCreator ? {
            author: {
              name: `${issueCreator.name ? `${issueCreator.name} (` : ""}${issueCreator?.login}${issueCreator.name ? ")" : ""}`,
              url: issueCreator.html_url,
              iconURL: issueCreator.avatar_url
            }
          } : {},
          title: issue.title,
          url: issue.html_url,
          description: issue.body_text
        }
      ]
    }
  });

  // Find the project item ID.
  const projectID = core.getInput("project-id", {required: false});
  if (projectID) {

    console.log("Updating Discord thread URL in project...");
    const response = await octokit.graphql<{
      data: {
        repository: {
          projectV2: {
            items: {
              nodes: {
                id: number
              }
            }
          }
        }
      }
    }>(`
      gh api graphql -f query='
        query {
          repository(name: "${issuePayload.repo}", owner: "${issuePayload.owner}") {
            projectV2(number: ${projectID}) {
              items {
                nodes(where: {content: {number: ${issuePayload.number}}}) {
                  id
                }
              }
            }
          }
        }'
    `);
    const itemID = response.data.repository.projectV2.items.nodes.id;

    // Set the thread ID on the issue.
    const fieldID = core.getInput("field-id");
    await octokit.graphql(`
      gh api graphql -f query='
        mutation {
          updateProjectV2ItemFieldValue(
            input: {
              projectId: ${projectID}
              itemId: ${itemID}
              fieldId: ${fieldID}
              value: {
                text: "https://discord.com/channels/${thread.guildID}/${thread.id}"
              }
            }
          ) {
            projectV2Item {
              id
            }  
          }
        }'
    `);

  }

  console.log("Successfully created issue.");

} catch (error) {

  console.error(error);
  core.setFailed(error instanceof Error ? error.message : "Unknown error.");

}