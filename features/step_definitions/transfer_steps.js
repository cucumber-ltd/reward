const { When } = require('cucumber')

When('{gitHubUser} transfers {int} {currency} to {gitHubIssue}', async function(gitHubUser, amount, currency, gitHubIssue) {
  const actor = await this.actor(gitHubUser)
  await actor.transfer({ amount, currency, gitHubIssue })
})