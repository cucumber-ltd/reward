module.exports = class RewardProjector {
  constructor({ pub, rewardStore, rewardQueries }) {
    if (!pub) throw new Error('No pub')
    this._pub = pub
    this._rewardStore = rewardStore
    this._rewardQueries = rewardQueries
  }

  async onAccountHolderCreated({ entityId: accountHolderId }) {
    const accountHolderInfo = {
      accountHolderId,
      externalIds: {},
      accounts: [],
    }

    await this._rewardStore.createAccountHolderInfo({ accountHolderInfo })
    await this._publishSignal({ accountHolderInfo })
  }

  async onAccountAdded({ entityId: accountHolderId, currency }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    accountHolderInfo.accounts.push({
      currency,
      balance: 0,
      messages: []
    })
    await this._rewardStore.createAccountHolderInfo({ accountHolderInfo })
    await this._publishSignal({ accountHolderInfo })
  }

  async onAccountHolderLinkedToExternalId({ entityId: accountHolderId, idType, externalId }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    accountHolderInfo.externalIds[idType] = externalId

    if (idType === 'gitHubIssue') {
      const match = externalId.match(/([\w-]+)\/([\w-]+)#(\d+)/)
      accountHolderInfo.gitHubOrg = match[1]
      await this._rewardStore.updateAccountHolderInfo({ accountHolderInfo })
      await this._publishSignal({ accountHolderInfo })
    }
  }

  async onAccountCredited({ entityId: accountHolderId, transactionId, currency, amount }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    const accountInfo = accountHolderInfo.accounts.find(acountInfo => acountInfo.currency === currency)
    accountInfo.balance += amount

    await this._rewardStore.updateAccountHolderInfo({ accountHolderInfo, transactionId })
    await this._publishSignal({ accountHolderInfo, transactionId })
  }

  async onAccountDebited({ entityId: accountHolderId, transactionId, currency, amount }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    const accountInfo = accountHolderInfo.accounts.find(acountInfo => acountInfo.currency === currency)
    accountInfo.balance -= amount

    await this._rewardStore.updateAccountHolderInfo({ accountHolderInfo, transactionId })
    await this._publishSignal({ accountHolderInfo, transactionId })
  }

  async onAccountDebitFailedDueToInsufficientFunds({ entityId: accountHolderId, transactionId, currency, amount }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    const accountInfo = accountHolderInfo.accounts.find(acountInfo => acountInfo.currency === currency)
    accountInfo.messages.push(`Failed to debit ${amount} due to insufficient funds. Balance: ${accountInfo.balance}`)

    await this._rewardStore.updateAccountHolderInfo({ accountHolderInfo, transactionId })
    await this._publishSignal({ accountHolderInfo, failedTransactionId: transactionId })
  }

  async _publishSignal({ accountHolderInfo, transactionId, failedTransactionId }) {
    await this._pub.publish(accountHolderInfo.accountHolderId)

    if(accountHolderInfo.gitHubOrg)
      await this._pub.publish(`gitHubOrg:${accountHolderInfo.gitHubOrg}`)
    if (transactionId)
      await this._pub.publish(transactionId)
    if (failedTransactionId)
      await this._pub.publish(`failedTransactionId:${failedTransactionId}`)

    for(const idType in accountHolderInfo.externalIds) {
      const externalId = accountHolderInfo.externalIds[idType]
      await this._pub.publish(`${idType}:${externalId}`)
    }
  }
}