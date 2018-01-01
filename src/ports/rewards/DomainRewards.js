const CreateReward = require('../../aggregates/account-holders/commands/CreateReward')

module.exports = class DomainRewards {
  constructor({ commandBus }) {
    this._commandBus = commandBus
  }

  async create({ accountHolderId, gitHubIssue }) {
    await this._commandBus.dispatchCommand(new CreateReward({
      accountHolderId,
      gitHubIssue,
      currencies: ['USD']
    }))
  }
}