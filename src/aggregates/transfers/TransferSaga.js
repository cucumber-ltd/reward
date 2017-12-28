const ValueObject = require('value-object')
const Withdraw = require('../accounts/commands/Withdraw')
const Deposit = require('../accounts/commands/Deposit')

// https://groups.google.com/forum/#!topic/dddcqrs/UYXXR4iU8f4
module.exports = class TransferSaga {
  static onTransferRequested() {
    return true
  }

  constructor({ commandBus, end }) {
    this._commandBus = commandBus
    this._end = end
  }

  async onTransferRequested({ entityId: transferId, fromAccountId, toAccountId, currency, amount }) {
    this._transferId = transferId
    this._toAccountId = toAccountId
    await this._commandBus.dispatchCommand(new Withdraw({ accountId: fromAccountId, transferId, currency, amount }))
  }

  async onAccountDebited({ transferId, currency, amount }) {
    if (transferId !== this._transferId) return
    await this._commandBus.dispatchCommand(new Deposit({ accountId: this._toAccountId, transferId, currency, amount }))
  }

  async onAccountCredited({ transferId }) {
    if (transferId !== this._transferId) return
    this._end()
  }

  async AccountDebitFailedDueToInsufficientFunds({ transferId }) {
    if (transferId !== this._transferId) return
    this._end()
  }
}

class ExecuteTransfer extends ValueObject.define({
  fromAccountId: 'string',
  toAccountId: 'string',
  currency: 'string',
  amount: 'number',
}) {
  static async process(repository, { fromAccountId, toAccountId, currency, amount }) {
    const account = await repository.load(Account, toAccountId)
    await account.executeTransfer({ fromAccountId, currency, amount })
  }
}

