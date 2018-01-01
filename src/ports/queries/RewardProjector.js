module.exports = class RewardProjector {
  constructor({ rewardStore, rewardQueries }) {
    this._rewardStore = rewardStore
    this._rewardQueries = rewardQueries
  }

  async onAccountHolderCreated({ entityId: accountHolderId }) {
    const accountHolderInfo = {
      accountHolderId,
      currencies: {},
      messages: []
    }

    await this._rewardStore.createAccountHolderInfo({ accountHolderInfo })
  }

  async onAccountCredited({ entityId: accountHolderId, transactionId, currency, amount }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    if (!accountHolderInfo.currencies[currency]) {
      accountHolderInfo.currencies[currency] = {
        balance: 0
      }
    }
    const currencyAccountHolderInfo = accountHolderInfo.currencies[currency]
    currencyAccountHolderInfo.balance += amount

    await this._rewardStore.updateAccountHolderInfo({ accountHolderInfo, transactionId })
  }

  async onAccountDebited({ entityId: accountHolderId, transactionId, currency, amount }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    if (!accountHolderInfo.currencies[currency]) {
      accountHolderInfo.currencies[currency] = {
        balance: 0
      }
    }
    const currencyAccountHolderInfo = accountHolderInfo.currencies[currency]
    currencyAccountHolderInfo.balance -= amount

    await this._rewardStore.updateAccountHolderInfo({ accountHolderInfo, transactionId })
  }

  async onAccountDebitFailedDueToInsufficientFunds({ entityId: accountHolderId, transactionId, currency, amount }) {
    const accountHolderInfo = await this._rewardQueries.getAccountHolderInfo(accountHolderId)
    if (!accountHolderInfo.currencies[currency]) {
      accountHolderInfo.currencies[currency] = {
        balance: 0
      }
    }
    const currencyAccountHolderInfo = accountHolderInfo.currencies[currency]
    accountHolderInfo.messages.push(`Failed to debit ${amount} from ${currency} account due to insufficient funds. Balance: ${currencyAccountHolderInfo.balance}`)
    await this._rewardStore.updateAccountHolderInfo({ accountHolderInfo, transactionId })
  }
}