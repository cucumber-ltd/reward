const { Given } = require('cucumber')

Given('a reward has been created for {gitHubIssue}', async function(gitHubIssue) {
  const accountId = this.id(gitHubIssue)
  await this.domainAssembly.rewards.create({ accountId, gitHubIssue })
})