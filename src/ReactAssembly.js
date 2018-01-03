const { createElement } = require('react')
const { render } = require('react-dom')
const RewardApp = require('./react/RewardApp')

module.exports = class ReactAssembly {
  constructor({ transfers, rewardQueries, sub, $domNode }) {
    render(createElement(RewardApp, { transfers, rewardQueries, sub }), $domNode)
  }
}