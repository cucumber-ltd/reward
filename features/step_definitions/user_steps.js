const { Given } = require('cucumber')

Given('{int} {currency} has been deposited to {gitHubUser}\'s account', async function(amount, currency, gitHubUser) {
  const accountHolderId = this.id(gitHubUser)
  const transactionId = this.id('DEPOSIT')
  await this.users.create({ accountHolderId, gitHubUser })
  await this.deposits.deposit({ accountHolderId, transactionId, currency, amount })
})