module.exports = class RewardStore {
  constructor({ pub }) {
    this._accountInfoByAccountId = new Map()
    this._pub = pub
  }

  async createAccountInfo({ accountInfo }) {
    this._accountInfoByAccountId.set(accountInfo.accountId, accountInfo)
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
}