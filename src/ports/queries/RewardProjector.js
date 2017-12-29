const ValueObject = require('value-object')

module.exports = class RewardProjector {
  constructor({ rewardStore }) {
    this._rewardStore = rewardStore
  }

  async onAccountCreated({ entityId: accountId, externalId }) {
    const accountInfo = {
      accountId,
      currencies: {},
      messages: []
    }

    await this._rewardStore.createAccountInfo({ accountInfo, externalId })
  }

  async onAccountCredited({ entityId: accountId, transferId, currency, amount }) {
    const accountInfo = await this._rewardStore.getQueries().getAccountInfo(accountId)
    if (!accountInfo.currencies[currency]) {
      accountInfo.currencies[currency] = {
        balance: 0
      }
    }
    const currencyAccountInfo = accountInfo.currencies[currency]
    currencyAccountInfo.balance += amount

    await this._rewardStore.updateAccountInfo({ accountInfo, transferId })
  }

  async onAccountDebited({ entityId: accountId, transferId, currency, amount }) {
    const accountInfo = await this._rewardStore.getQueries().getAccountInfo(accountId)
    if (!accountInfo.currencies[currency]) {
      accountInfo.currencies[currency] = {
        balance: 0
      }
    }
    const currencyAccountInfo = accountInfo.currencies[currency]
    currencyAccountInfo.balance -= amount

    await this._rewardStore.updateAccountInfo({ accountInfo, transferId })
  }

  async onAccountDebitFailedDueToInsufficientFunds({ entityId: accountId, transferId, currency, amount }) {
    const accountInfo = await this._rewardStore.getQueries().getAccountInfo(accountId)
    if (!accountInfo.currencies[currency]) {
      accountInfo.currencies[currency] = {
        balance: 0
      }
    }
    const currencyAccountInfo = accountInfo.currencies[currency]
    accountInfo.messages.push(`Failed to debit ${amount} from ${currency} account due to insufficient funds. Balance: ${currencyAccountInfo.balance}`)
    await this._rewardStore.updateAccountInfo({ accountInfo, transferId })
  }
}