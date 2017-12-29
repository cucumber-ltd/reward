module.exports = class RewardStore {
  constructor({ pub }) {
    this._accountInfoByAccountId = new Map()
    this._accountIdByExternalId = new Map()
    this._pub = pub
  }

  async createAccountInfo({ accountInfo, externalId }) {
    this._accountInfoByAccountId.set(accountInfo.accountId, accountInfo)
    this._accountIdByExternalId.set(externalId, accountInfo.accountId)
    await this._pub.publish(accountInfo.accountId)
  }

  async updateAccountInfo({ accountInfo, transferId }) {
    this._accountInfoByAccountId.set(accountInfo.accountId, accountInfo)
    await this._pub.publish(accountInfo.accountId)
    await this._pub.publish(transferId)
  }

  async _getAccountInfo(accountId) {
    return this._accountInfoByAccountId.get(accountId)
  }

  async _getAccountInfoByExternalId(externalId) {
    const accountId = this._accountIdByExternalId.get(externalId)
    return this._getAccountInfo(accountId)
  }

  getQueries() {
    return {
      getAccountInfoByExternalId: this._getAccountInfoByExternalId.bind(this),
      getAccountInfo: this._getAccountInfo.bind(this)
    }
  }
}