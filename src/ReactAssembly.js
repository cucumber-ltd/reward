const { createElement } = require('react')
const { render } = require('react-dom')
const RewardApp = require('./react/RewardApp')

module.exports = class ReactAssembly {
  // TODO: Don't pass accountHolderId? Get it via pub/sub?
  constructor({ nextId, subscriber, transfers, rewardQueries, accountHolderId, $domNode }) {
    if(!accountHolderId) throw new Error('No accountHolderId')
    if (!subscriber) throw new Error('No subscriber')
    render(createElement(RewardApp, { nextId, subscriber, transfers, rewardQueries, accountHolderId }), $domNode)
  }
}