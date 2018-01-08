const { createElement } = require('react')
const { render } = require('react-dom')
const RewardApp = require('./react/RewardApp')

module.exports = class ReactAssembly {
  // TODO: Don't pass accountHolderId? Get it via pub/sub?
  constructor({ nextId, sub, transfers, rewardQueries, accountHolderId, $domNode }) {
    if(!accountHolderId) throw new Error('No accountHolderId')
    render(createElement(RewardApp, { nextId, sub, transfers, rewardQueries, accountHolderId }), $domNode)
  }
}