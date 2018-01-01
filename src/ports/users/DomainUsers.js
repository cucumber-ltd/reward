const CreateUser = require('../../aggregates/account-holders/commands/CreateUser')

module.exports = class DomainUsers {
  constructor({ commandBus }) {
    this._commandBus = commandBus
  }

  async create({ accountHolderId, gitHubUser }) {
    await this._commandBus.dispatchCommand(new CreateUser({
      accountHolderId,
      gitHubUser,
      currencies: ['USD']
    }))
  }
}
