const { Given } = require('cucumber')

Given('{int} {currency} has been deposited to {gitHubUser}\'s account', async function(amount, currency, gitHubUser) {
  const accountId = this.id(gitHubUser)
  const transferId = this.id('DEPOSIT')
  await this.domainAssembly.users.create({ accountId, gitHubUser })
  await this.domainAssembly.deposits.deposit({ accountId, transferId, currency, amount })
})