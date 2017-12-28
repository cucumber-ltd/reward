const ValueObject = require('value-object')

module.exports = class RewardProjector {
  constructor({ rewardStore }) {
    this._rewardStore = rewardStore
  }

  async onAccountCreated({ entityId: accountId, externalId }) {
    const accountInfo = {
      accountId,
      currencies: {}
    }
    await this._rewardStore.createAccountInfo({ accountInfo, externalId })
  }

  async onAccountCredited({ entityId: accountId, currency, amount }) {
    const accountInfo = await this._rewardStore.getQueries().getAccountInfo(accountId)
    if (!accountInfo.currencies[currency]) {
      accountInfo.currencies[currency] = {
        balance: 0
      }
    }
    const currencyAccountInfo = accountInfo.currencies[currency]
    currencyAccountInfo.balance += amount

    await this._rewardStore.updateAccountInfo({ accountInfo })
  }

  async onAccountDebited({ entityId: accountId, currency, amount }) {
    const accountInfo = await this._rewardStore.getQueries().getAccountInfo(accountId)
    if (!accountInfo.currencies[currency]) {
      accountInfo.currencies[currency] = {
        balance: 0
      }
    }
    const currencyAccountInfo = accountInfo.currencies[currency]
    currencyAccountInfo.balance -= amount

    await this._rewardStore.updateAccountInfo({ accountInfo })
  }
}