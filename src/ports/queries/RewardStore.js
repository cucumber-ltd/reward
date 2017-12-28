module.exports = class RewardStore {
  constructor() {
    this._accountInfoByAccountId = new Map()
    this._accountIdByExternalId = new Map()
  }

  async createAccountInfo({ accountInfo, externalId }) {
    this._accountInfoByAccountId.set(accountInfo.accountId, accountInfo)
    this._accountIdByExternalId.set(externalId, accountInfo.accountId)
  }

  async updateAccountInfo({ accountInfo }) {
    this._accountInfoByAccountId.set(accountInfo.accountId, accountInfo)
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