const ValueObject = require('value-object')
const Account = require('../entities/Account')

module.exports = class DomainTransfers {
  constructor({ commandBus }) {
    this._commandBus = commandBus
  }

  async requestTransfer({ fromAccountId, toAccountId, currency, amount }) {
    await this._commandBus.dispatchCommand(new RequestTransfer({ fromAccountId, toAccountId, currency, amount }))
  }
}

// https://groups.google.com/forum/#!topic/dddcqrs/OjRxsqvQ1UU
// https://groups.google.com/forum/#!topic/dddcqrs/UYXXR4iU8f4
class RequestTransfer extends ValueObject.define({
  fromAccountId: 'string',
  toAccountId: 'string',
  currency: 'string',
  amount: 'number',
}) {
  static async process(repository, { fromAccountId, toAccountId, currency, amount }) {
    const account = await repository.load(Account, fromAccountId)
    await account.requestTransfer({ toAccountId, currency, amount })
  }
}
