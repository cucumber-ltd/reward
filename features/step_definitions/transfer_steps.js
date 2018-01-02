const { When } = require('cucumber')

When('{actor} transfers {int} {currency} to {gitHubIssue}', async function(actor, amount, currency, gitHubIssue) {
  const toAccountHolderId = this.id(gitHubIssue)
  await actor.transfer({ amount, currency, toAccountHolderId })
})