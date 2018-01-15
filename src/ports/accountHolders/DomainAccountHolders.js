const CreateAccountHolder = require('../../aggregates/account-holders/commands/CreateAccountHolder')

module.exports = class DomainAccountHolders {
  constructor({ commandBus }) {
    this._commandBus = commandBus
  }

  async create({ accountHolderId }) {
    await this._commandBus.dispatchCommand(new CreateAccountHolder({
      accountHolderId,
      currencies: ['USD']
    }))
  }
}