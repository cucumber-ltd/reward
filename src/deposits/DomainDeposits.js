const ValueObject = require('value-object')
const Account = require('../entities/Account')

module.exports = class DomainDeposits {
  constructor({ commandBus }) {
    this._commandBus = commandBus
  }

  async deposit({ accountId, currency, amount }) {
    await this._commandBus.dispatchCommand(new Deposit({ accountId, currency, amount }))
  }
}

class Deposit extends ValueObject.define({
  accountId: 'string',
  currency: 'string',
  amount: 'number',
}) {
  static async process(repository, { accountId, currency, amount }) {
    const account = await repository.load(Account, accountId)
    await account.credit({ currency, amount })
  }
}
