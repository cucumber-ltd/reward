module.exports = class HttpTransfers {
  constructor({ fetch22 }) {
    if (!fetch22) throw new Error('No fetch22')
    this._fetch22 = fetch22
  }

  async requestTransfer({ transferId, fromAccountId, toAccountId, currency, amount }) {
    await this._fetch22.post('/transfers', { transferId, fromAccountId, toAccountId, currency, amount })
  }
}
