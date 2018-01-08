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
    await this.trace.start()
    // Wait for the trace's subscription to be registered. (It subscribes to null, which means all signals)
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
    // TODO: React test fails here, because RewardApp currently ignores *this* transactionId and
    // creates its own transactionId internally, so we never see *this* transactionId in the trace
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