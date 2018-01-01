module.exports = class HttpTransfers {
  constructor({ fetch22 }) {
    if (!fetch22) throw new Error('No fetch22')
    this._fetch22 = fetch22
  }

  async requestTransfer({ transactionId, fromAccountHolderId, toAccountHolderId, currency, amount }) {
    await this._fetch22.post('/transfers', { transactionId, fromAccountHolderId, toAccountHolderId, currency, amount })
  }
}
