const TestDomTransfers = require('./ports/transfers/TestDomTransfers')
const TestDomRewardQueries = require('./ports/queries/test/TestDomRewardQueries')

module.exports = class DomTestAssembly {
  constructor({ setNextId, $domNode }) {
    this.transfers = new TestDomTransfers({ setNextId, $domNode })
    this.rewardQueries = new TestDomRewardQueries({ $domNode })
  }
}