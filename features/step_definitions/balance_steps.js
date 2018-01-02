const assert = require('assert')
const { Then } = require('cucumber')

Then('{actor} should see that {gitHubIssue} has {int} {currency}', async function(actor, gitHubIssue, expectedBalance, currency) {
  const accountHolderId = this.id(gitHubIssue)
  const actualBalance = await actor.getBalance({ accountHolderId, currency })
  assert.equal(actualBalance, expectedBalance)
})

Then('{actor} should have {int} {currency}', async function(actor, expectedBalance, currency) {
  const accountHolderId = actor.accountHolderId
  const actualBalance = await actor.getBalance({ accountHolderId, currency })
  assert.equal(actualBalance, expectedBalance)
})