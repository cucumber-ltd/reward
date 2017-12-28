const CreateAccount = require('../entities/CreateAccount')

module.exports = class DomainVoters {
  constructor({ commandBus }) {
    this._commandBus = commandBus
  }

  async create({ accountId, gitHubUser }) {
    await this._commandBus.dispatchCommand(new CreateAccount({
      accountId,
      externalId: gitHubUser
    }))
  }
}
