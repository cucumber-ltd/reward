const ValueObject = require('value-object')
const TransferRequest = require('../entities/TransferRequest')

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

// https://groups.google.com/forum/#!topic/dddcqrs/OjRxsqvQ1UU
// https://groups.google.com/forum/#!topic/dddcqrs/UYXXR4iU8f4
class RequestTransfer extends ValueObject.define({
  transferId: 'string',
  fromAccountId: 'string',
  toAccountId: 'string',
  currency: 'string',
  amount: 'number',
}) {
  static async process(repository, { transferId, fromAccountId, toAccountId, currency, amount }) {
    await repository.create(TransferRequest, transferId, { fromAccountId, toAccountId, currency, amount })
  }
}
