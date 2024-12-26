import { Client } from "oceanic.js";
import core from "@actions/core";
import github from "@actions/github";
import { createAppAuth } from "@octokit/auth-app";

try {

  // Authenticate as an installation to get the app token.
  const baseAuth = createAppAuth({
    appId: core.getInput("github-app-id", {required: true}),
    privateKey: core.getInput("github-app-private-key", {required: true}),
    clientId: core.getInput("github-app-client-id", {required: true}),
    clientSecret: core.getInput("github-app-client-secret", {required: true})
  });

  const installationAuth = await baseAuth({
    type: "installation",
    installationId: core.getInput("github-app-client-secret", {required: true}) // Get the installation ID from the GitHub app settings.
  });

  // Get the issue title.
  const issuePayload = github.context.issue;
  const octokit = github.getOctokit(installationAuth.token, {auth: installationAuth});
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
      data: {
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
      }
    }>(`
      query getItemID($name: String!, $owner: String!, $projectID: Int!, $issueNumber: Int!) {
        repository(name: $name, owner: $owner) {
          issue(number: $issueNumber) {
            projectV2(number: $projectID) {
              items {
                nodes {
                  id
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
    const itemID = response.data.repository.issue.projectV2.items.nodes.id;

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