const RequestTransfer = require('../../aggregates/transfers/commands/RequestTransfer')

module.exports = class DomainTransfers {
  constructor({ commandBus }) {
    this._commandBus = commandBus
  }

  async requestTransfer({ transferId, fromAccountId, toAccountId, currency, amount }) {
    await this._commandBus.dispatchCommand(new RequestTransfer({
      transferId,
      fromAccountId,
      toAccountId,
      currency,
      amount
    }))
  }
}
