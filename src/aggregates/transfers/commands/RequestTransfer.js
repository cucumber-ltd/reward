const ValueObject = require('value-object')
const TransferRequest = require('../TransferRequest')

module.exports = class RequestTransfer extends ValueObject.define({
  transactionId: 'string',
  fromAccountHolderId: 'string',
  toAccountHolderId: 'string',
  currency: 'string',
  amount: 'number',
}) {
  static async process(repository, { transactionId, fromAccountHolderId, toAccountHolderId, currency, amount }) {
    await repository.create(TransferRequest, transactionId, { fromAccountHolderId, toAccountHolderId, currency, amount })
  }
}
