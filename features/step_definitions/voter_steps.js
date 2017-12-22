const { Given } = require('cucumber')

Given('{int} {currency} has been deposited to {gitHubUser}\'s account', async function(amount, currency, gitHubUser) {
  const voterId = this.id(gitHubUser)
  await this.domain.voters.create({ voterId })
  await this.domain.deposits.deposit({ voterId, currency, amount })
})