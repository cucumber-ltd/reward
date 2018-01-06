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
