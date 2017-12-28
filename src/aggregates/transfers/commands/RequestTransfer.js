const ValueObject = require('value-object')
const TransferRequest = require('../TransferRequest')

module.exports = class RequestTransfer extends ValueObject.define({
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
