const { createElement } = require('react')
const { render } = require('react-dom')
const RewardApp = require('./react/RewardApp')

module.exports = class ReactAssembly {
  constructor({ sub, rewardQueries, $domNode }) {
    render(createElement(RewardApp, { sub, rewardQueries }), $domNode)
  }
}