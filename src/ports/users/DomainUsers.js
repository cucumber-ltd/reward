const CreateAccount = require('../../aggregates/accounts/commands/CreateAccount')

module.exports = class DomainUsers {
  constructor({ commandBus }) {
    this._commandBus = commandBus
  }

  async create({ accountId }) {
    await this._commandBus.dispatchCommand(new CreateAccount({
      accountId
    }))
  }
}
