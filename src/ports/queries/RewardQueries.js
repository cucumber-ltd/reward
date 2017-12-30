module.exports = class RewardQueries {
  constructor({ rewardStore }) {
    this._rewardStore = rewardStore
  }

  async getAccountInfo(accountId) {
    return this._rewardStore._getAccountInfo(accountId)
  }
}
