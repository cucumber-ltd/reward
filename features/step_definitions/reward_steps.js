const { Given } = require('cucumber')

Given('a reward has been created for {gitHubIssue}', async function(gitHubIssue) {
  const rewardId = this.id(gitHubIssue)
  await this.domain.rewards.create({ rewardId })
})