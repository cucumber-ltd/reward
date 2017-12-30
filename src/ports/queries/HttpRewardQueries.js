module.exports = class HttpRewardQueries {
  constructor({ fetch22 }) {
    if (!fetch22) throw new Error('No fetch22')
    this._fetch22 = fetch22
  }

  async getAccountInfo(accountId) {
    return this._fetch22.get(`/accounts/${encodeURIComponent(accountId)}`)
  }
}
