const assert = require('assert')
const { Then } = require('cucumber')

Then('{gitHubUser} should see that {gitHubIssue} has {int} {currency}', async function(gitHubUser, gitHubIssue, expectedBalance, currency) {
  const actor = await this.actor(gitHubUser)
  const accountId = this.id(gitHubIssue)
  const actualBalance = await actor.getBalance({ accountId, currency })
  assert.equal(actualBalance, expectedBalance)
})

Then('{gitHubUser} should have {int} {currency}', async function(gitHubUser, expectedBalance, currency) {
  const actor = await this.actor(gitHubUser)
  const accountId = this.id(gitHubUser)
  const actualBalance = await actor.getBalance({ accountId, currency })
  assert.equal(actualBalance, expectedBalance)
})