const ReactAssembly = require('../../src/ReactAssembly')
const DomTestAssembly = require('../../src/DomTestAssembly')
const Actor = require('../support/Actor')
const BaseTestAssembly = require('./BaseTestAssembly')

module.exports = class ReactTestAssembly extends BaseTestAssembly {
  makeActor(accountHolderId) {
    const $domNode = document.createElement('div')
    $domNode.id = `cucumber-actor-${accountHolderId}`
    document.body.appendChild($domNode)

    this.makeReactAssembly({ $domNode })
    const { sub } = this
    const { transfers, rewardQueries } = new DomTestAssembly({ $domNode })
    return new Actor({ accountHolderId, sub, transfers, rewardQueries })
  }

  makeReactAssembly({ $domNode }) {
    const { sub, transfers, rewardQueries } = this
    return new ReactAssembly({ sub, transfers, rewardQueries, $domNode })
  }

  async start() {
  }

  async stop() {
  }
}
