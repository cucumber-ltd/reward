const RequestTransfer = require('../../aggregates/transfers/commands/RequestTransfer')

module.exports = class DomainTransfers {
  constructor({ commandBus }) {
    this._commandBus = commandBus
  }

  async requestTransfer({ transactionId, fromAccountHolderId, toAccountHolderId, currency, amount }) {
    await this._commandBus.dispatchCommand(new RequestTransfer({
      transactionId,
      fromAccountHolderId,
      toAccountHolderId,
      currency,
      amount
    }))
  }
}
