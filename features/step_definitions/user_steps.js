const uuid = require('uuid/v4')
const { SignalTrace } = require('pubsub-multi')
const { Before, Given } = require('cucumber')

Before(async function() {
  const accountHolderId = this.id('internal')
  await this.accountHolders.create({ accountHolderId })
})

Given('{int} {currency} has been deposited to {gitHubUser}\'s account', async function(amount, currency, gitHubUser) {
  const toAccountHolderId = this.id(gitHubUser)
  await this.users.create({ accountHolderId: toAccountHolderId, gitHubUser })

  const fromAccountHolderId = this.id('internal')

  // PATTERN: A trace should be local to avoid state from previous operations
  const subscriber = this.publisher.makeSubscriber()
  const trace = new SignalTrace(subscriber)
  await trace.start()

  const transactionId = uuid()
  await this.transfers.requestTransfer({
    transactionId,
    fromAccountHolderId,
    toAccountHolderId,
    currency,
    amount
  })
  await trace.containsSignal(transactionId, 2)
})