const BaseTestAssembly = require('./BaseTestAssembly')
const Actor = require('../support/Actor')

module.exports = class DomainTestAssembly extends BaseTestAssembly {
  makeActor(accountHolderId) {
    const { sub, transfers, rewardQueries } = this
    return new Actor({ accountHolderId, sub, transfers, rewardQueries })
  }

  async start() {
  }

  async stop() {
  }
}
