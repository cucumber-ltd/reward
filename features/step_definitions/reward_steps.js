const { Given } = require('cucumber')

Given('a reward has been created for {gitHubIssue}', async function(gitHubIssue) {
  const accountId = this.id(gitHubIssue)
  await this.domain.rewards.create({ accountId, gitHubIssue })
})