const assert = require('assert')
const { Then } = require('cucumber')

Then('{gitHubUser} should see that {gitHubIssue} has {int} {currency}', async function(gitHubUser, gitHubIssue, expectedBalance, currency) {
  const actor = await this.actor(gitHubUser)
  const actualBalance = await actor.getBalance({ currency, externalId: gitHubIssue })
  assert.equal(actualBalance, expectedBalance)
})

Then('{gitHubUser} should have {int} {currency}', async function(gitHubUser, expectedBalance, currency) {
  const actor = await this.actor(gitHubUser)
  const actualBalance = await actor.getBalance({ currency, externalId: gitHubUser })
  assert.equal(actualBalance, expectedBalance)
})