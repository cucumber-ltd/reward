const { When } = require('cucumber')

When('{gitHubUser} donates {int} {currency} to {gitHubIssue}', async function(gitHubUser, amount, currency, gitHubIssue) {
  const actor = await this.actor(gitHubUser)
  await actor.donate({ amount, currency, gitHubIssue })
})