const { When } = require('cucumber')

When('{gitHubUser} donates {int} {currency} to {gitHubIssue}', async function(gitHubUser, amount, currency, gitHubIssue) {
  const actor = await this.actor(gitHubUser)
  try {
    await actor.donate({ amount, currency, gitHubIssue })
  } catch (err) {
    // An error will be thrown if there are insufficient funds. Ignore it - a Then step should check for the outcome.
  }
})