const { Given } = require('cucumber')

Given('a reward has been created for {gitHubIssue}', async function(gitHubIssue) {
  const accountHolderId = this.id(gitHubIssue)
  await this.domainAssembly.rewards.create({ accountHolderId, gitHubIssue })
})