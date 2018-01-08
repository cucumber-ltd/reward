// Disable React DevTools warning: https://github.com/facebook/react/issues/3877#issuecomment-335679554
if (typeof window !== 'undefined') {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
    supportsFiber: true,
    inject: () => {
    },
    onCommitFiberRoot: () => {
    },
    onCommitFiberUnmount: () => {
    }
  }
}
const ReactAssembly = require('../../src/ReactAssembly')
const DomTestAssembly = require('../../src/DomTestAssembly')
const Actor = require('../support/Actor')
const BaseTestAssembly = require('./BaseTestAssembly')

module.exports = class ReactTestAssembly extends BaseTestAssembly {
  makeActor(accountHolderId) {
    const $domNode = document.createElement('div')
    $domNode.id = `cucumber-actor-${accountHolderId}`
    document.body.appendChild($domNode)

    this.makeReactAssembly({ accountHolderId, $domNode })
    const { setNextId, sub } = this

    const { transfers, rewardQueries } = new DomTestAssembly({ setNextId, $domNode })
    return new Actor({ accountHolderId, sub, transfers, rewardQueries })
  }

  makeReactAssembly({ accountHolderId, $domNode }) {
    const { nextId, sub, transfers, rewardQueries } = this
    return new ReactAssembly({ nextId, sub, transfers, rewardQueries, accountHolderId, $domNode })
  }

  async start() {
  }

  async stop() {
  }
}
