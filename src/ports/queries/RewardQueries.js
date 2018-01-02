module.exports = class RewardQueries {
  constructor({ rewardStore }) {
    this._rewardStore = rewardStore
  }

  async getAccountHolderInfo(accountHolderId) {
    return this._rewardStore._getAccountHolderInfo(accountHolderId)
  }

  async getRewards({ gitHubOrg }) {
    return this._rewardStore._getRewards({ gitHubOrg })
  }
}
