const uuid = require('uuid/v4')
const { SignalTrace } = require('pubsub-multi')

module.exports = class Actor {
  constructor({ accountHolderId, sub, transfers, rewardQueries }) {
    this.accountHolderId = accountHolderId
    this.trace = new SignalTrace(sub)
    this.transfers = transfers
    this.rewardQueries = rewardQueries
  }

  async start(pub) {
    // PATTERN: Actor has a start method that waits for the trace's subscription to be registered.
    // When the actor performs actions (commands) that have an observable outcome, it can use the
    // trace's `containsSignal` method to wait for those outcomes.

    // (Subscribe to null, which means all signals. We only do this in test code, the app shouldn't do this.)
    await this.trace.start()
    await pub.subscriptions(null, 1)
  }

  // Commands

  async transfer({ currency, amount, toAccountHolderId }) {
    const transactionId = uuid()
    await this.transfers.requestTransfer({
      transactionId,
      fromAccountHolderId: this.accountHolderId,
      toAccountHolderId,
      currency,
      amount
    })
    // PATTERN: Wait for all possible outcomes
    await Promise.race([
      this.trace.containsSignal(`failedTransactionId:${transactionId}`, 1),
      this.trace.containsSignal(transactionId, 2)
    ])
  }

  // Queries

  async getBalance({ accountHolderId, currency }) {
    const accountHolderInfo = await this.rewardQueries.getAccountHolderInfo(accountHolderId)
    const accountInfo = accountHolderInfo.accounts.find(accountInfo => accountInfo.currency === currency)
    return accountInfo.balance
  }

  async rewards({ gitHubOrg }) {
    return this.rewardQueries.getRewards({ gitHubOrg })
  }
}