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
    name: issue.title,
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
          id: string;
          projectV2: {
            id: string;
            field: {
              id: number;
            };
            items: {
              nodes: {
                id: string,
                content: {
                  id: string
                }
              }[]
            }
          }
        }
      }
    }>(`
      query getItemID($name: String!, $owner: String!, $projectID: Int!, $issueNumber: Int!, $fieldName: String!) {
        repository(name: $name, owner: $owner) {
          issue(number: $issueNumber) {
            id
            projectV2(number: $projectID) {
              id
              field(name: $fieldName) {
                ... on ProjectV2Field {
                  id
                  name
                  databaseId
                }
              }
              items {
                nodes {
                  id
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
      fieldName: core.getInput("field-name", {required: true})
    });
    console.log(JSON.stringify(response));
    const targetNodeID = response.repository.issue.id;
    const projectNodeID = response.repository.issue.projectV2.id;
    const nodes = response.repository.issue.projectV2.items.nodes;
    const itemID = nodes.find((node) => node.content.id === targetNodeID)!.id;
    const fieldID = response.repository.issue.projectV2.field.id;

    // Set the thread ID on the issue.
    await octokit.graphql(`
      mutation setItemFields($projectNodeID: ID!, $itemID: ID!, $fieldID: ID!) {
        updateProjectV2ItemFieldValue(
          input: {
            projectId: $projectNodeID
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
    `, {projectNodeID, itemID, fieldID});

  }

  console.log("Successfully created issue.");

} catch (error) {

  console.error(error);
  core.setFailed(error instanceof Error ? error.message : "Unknown error.");

}