module.exports = class RewardStore {
  constructor({ pub }) {
    this._accountHolderInfoByAccountId = new Map()
    this._pub = pub
  }

  async createAccountHolderInfo({ accountHolderInfo }) {
    this._accountHolderInfoByAccountId.set(accountHolderInfo.accountHolderId, accountHolderInfo)
    await this._pub.publish(accountHolderInfo.accountHolderId)
  }

  async updateAccountHolderInfo({ accountHolderInfo, transactionId }) {
    this._accountHolderInfoByAccountId.set(accountHolderInfo.accountHolderId, accountHolderInfo)
    await this._pub.publish(accountHolderInfo.accountHolderId)
    await this._pub.publish(transactionId)
  }

  async _getAccountHolderInfo(accountHolderId) {
    return this._accountHolderInfoByAccountId.get(accountHolderId)
  }
}