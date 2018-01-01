const Deposit = require('../../aggregates/account-holders/commands/Deposit')

module.exports = class DomainDeposits {
  constructor({ commandBus }) {
    this._commandBus = commandBus
  }

  async deposit({ accountHolderId, transactionId, currency, amount }) {
    await this._commandBus.dispatchCommand(new Deposit({ accountHolderId, transactionId, currency, amount }))
  }
}
