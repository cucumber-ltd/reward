module.exports = class RewardProjector {
  constructor({ rewardStore, rewardQueries }) {
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
  }

  async onAccountAdded({ entityId: accountHolderId, currency }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    accountHolderInfo.accounts.push({
      currency,
      balance: 0,
      messages: []
    })
    await this._rewardStore.createAccountHolderInfo({ accountHolderInfo })
  }

  async onAccountHolderLinkedToExternalId({ entityId: accountHolderId, idType, externalId }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    accountHolderInfo.externalIds[idType] = externalId

    if (idType === 'gitHubIssue') {
      const match = externalId.match(/([\w-]+)\/([\w-]+)#(\d+)/)
      const gitHubOrg = match[1]
      await this._rewardStore.updateAccountHolderInfo({ accountHolderInfo, gitHubOrg })
      await this._rewardStore.linkAccountHolderInfo({ accountHolderId, gitHubOrg })
    }
  }

  async onAccountCredited({ entityId: accountHolderId, transactionId, currency, amount }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    const accountInfo = accountHolderInfo.accounts.find(acountInfo => acountInfo.currency === currency)
    accountInfo.balance += amount

    await this._rewardStore.updateAccountHolderInfo({ accountHolderInfo, transactionId })
  }

  async onAccountDebited({ entityId: accountHolderId, transactionId, currency, amount }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    const accountInfo = accountHolderInfo.accounts.find(acountInfo => acountInfo.currency === currency)
    accountInfo.balance -= amount

    await this._rewardStore.updateAccountHolderInfo({ accountHolderInfo, transactionId })
  }

  async onAccountDebitFailedDueToInsufficientFunds({ entityId: accountHolderId, transactionId, currency, amount }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    const accountInfo = accountHolderInfo.accounts.find(acountInfo => acountInfo.currency === currency)
    accountInfo.messages.push(`Failed to debit ${amount} due to insufficient funds. Balance: ${accountInfo.balance}`)

    await this._rewardStore.updateAccountHolderInfo({ accountHolderInfo, transactionId })
  }
}