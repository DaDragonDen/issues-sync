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

  // Create a thread referencing the GitHub issue.
  console.log("Creating Discord thread...");
  const discordToken = core.getInput("discord-token", {required: true});
  const discordChannelID = core.getInput("discord-channel-id", {required: true});
  const issueCreator = issue.user;
  const client = new Client({auth: `Bot ${discordToken}`});
  await client.restMode(true);
  
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
  const projectIDString = core.getInput("project-id", {required: false});
  if (projectIDString) {

    console.log("Updating Discord thread URL in project...");
    const projectID = parseInt(projectIDString, 10);
    const response = await octokit.graphql<{
      repository: {
        issue: {
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
      query getItemID($name: String!, $owner: String!, $projectID: Int!, $issueNumber: Int!) {
        repository(name: $name, owner: $owner) {
          issue(number: $issueNumber) {
            projectV2(number: $projectID) {
              items {
                nodes {
                  id
                  content {
                    databaseId
                    fullDatabaseId
                    id
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
      issueNumber: issuePayload.number
    });
    console.log(JSON.stringify(response));
    const itemID = response.repository.issue.projectV2.items.nodes.id;

    // Set the thread ID on the issue.
    const fieldID = core.getInput("field-id", {required: true});
    await octokit.graphql(`
      mutation setItemFields($projectID: Int!, $itemID: Int!, $fieldID: Int!) {
        updateProjectV2ItemFieldValue(
          input: {
            projectId: $projectID
            itemId: $itemID
            fieldId: $fieldID
            value: {
              text: "https://discord.com/channels/${thread.guildID}/${thread.id}"
            }
          }
        ) {
          projectV2Item {
            id
          }  
        }
      }
    `, {projectID, itemID, fieldID});

  }

  console.log("Successfully created issue.");

} catch (error) {

  console.error(error);
  core.setFailed(error instanceof Error ? error.message : "Unknown error.");

}