const CreateAccount = require('../../aggregates/accounts/commands/CreateAccount')

module.exports = class DomainRewards {
  constructor({ commandBus }) {
    this._commandBus = commandBus
  }

  async create({ accountId, gitHubIssue }) {
    await this._commandBus.dispatchCommand(new CreateAccount({
      accountId,
      externalId: gitHubIssue
    }))
  }
}