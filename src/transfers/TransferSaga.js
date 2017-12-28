const ValueObject = require('value-object')
const Account = require('../entities/Account')

module.exports = class TransferSaga {
  static onTransferApproved(event) {
    return true
  }

  constructor({ commandBus, end }) {
    this._commandBus = commandBus
    this._end = end
  }

  async onTransferApproved({ entityId: fromAccountId, toAccountId, currency, amount }) {
    await this._commandBus.dispatchCommand(new ExecuteTransfer({ fromAccountId, toAccountId, currency, amount }))
  }

  async onTransferExecuted(event) {
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

