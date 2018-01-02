const ReactAssembly = require('../../src/ReactAssembly')
const DomTestAssembly = require('../../src/DomTestAssembly')
const Actor = require('../support/Actor')
const BaseTestAssembly = require('./BaseTestAssembly')

module.exports = class ReactTestAssembly extends BaseTestAssembly {
  makeActor(accountHolderId) {
    const { sub } = this.domainAssembly
    const reactAssembly = new ReactAssembly(this.domainAssembly)
    const { transfers, rewardQueries } = new DomTestAssembly(reactAssembly)

    return new Actor({
      accountHolderId,
      sub,
      transfers,
      rewardQueries,
    })
  }

  async start() {
  }

  async stop() {
  }
}
