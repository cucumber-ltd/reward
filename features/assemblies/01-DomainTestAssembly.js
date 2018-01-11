const BaseTestAssembly = require('./BaseTestAssembly')
const Actor = require('../support/Actor')

module.exports = class DomainTestAssembly extends BaseTestAssembly {
  makeActor(accountHolderId) {
    const { publisher, transfers, rewardQueries } = this
    return new Actor({ accountHolderId, publisher, transfers, rewardQueries })
  }

  async start() {
  }

  async stop() {
  }
}
