const Withdraw = require('../account-holders/commands/Withdraw')
const Deposit = require('../account-holders/commands/Deposit')

// https://groups.google.com/forum/#!topic/dddcqrs/UYXXR4iU8f4
module.exports = class TransferSaga {
  static onTransferRequested() {
    return true
  }

  constructor({ commandBus, end }) {
    this._commandBus = commandBus
    this._end = end
  }

  async onTransferRequested({ entityId: transactionId, fromAccountHolderId, toAccountHolderId, currency, amount }) {
    // TODO: Removing this line doesn't cause any tests to fail.
    // However, it is needed to handle concurrently running transactions.
    // We need a unit test for this!
    if (this._transactionId) return
    this._transactionId = transactionId
    this._toAccountHolderId = toAccountHolderId
    await this._commandBus.dispatchCommand(new Withdraw({
      accountHolderId: fromAccountHolderId,
      transactionId,
      currency,
      amount
    }))
  }

  async onAccountDebited({ transactionId, currency, amount }) {
    if (transactionId !== this._transactionId) return
    await this._commandBus.dispatchCommand(new Deposit({
      accountHolderId: this._toAccountHolderId,
      transactionId,
      currency,
      amount
    }))
  }

  async onAccountCredited({ transactionId }) {
    if (transactionId !== this._transactionId) return
    this._end()
  }

  async AccountDebitFailedDueToInsufficientFunds({ transactionId }) {
    if (transactionId !== this._transactionId) return
    this._end()
  }
}
