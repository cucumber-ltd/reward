const ValueObject = require('value-object')
const Deposit = require('../../aggregates/accounts/commands/Deposit')

module.exports = class DomainDeposits {
  constructor({ commandBus }) {
    this._commandBus = commandBus
  }

  async deposit({ accountId, currency, amount }) {
    await this._commandBus.dispatchCommand(new Deposit({ accountId, transferId: null, currency, amount }))
  }
}
