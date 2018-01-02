module.exports = class HttpRewardQueries {
  constructor({ fetch22 }) {
    if (!fetch22) throw new Error('No fetch22')
    this._fetch22 = fetch22
  }

  async getAccountHolderInfo(accountHolderId) {
    return this._fetch22.get(`/accountholders/${encodeURIComponent(accountHolderId)}`)
  }

  async getRewards({ gitHubOrg }) {
    return this._fetch22.get(`/rewards/github/${encodeURIComponent(gitHubOrg)}`)
  }
}