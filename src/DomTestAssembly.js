const TestDomTransfers = require('./ports/transfers/TestDomTransfers')
const TestDomRewardQueries = require('./ports/queries/TestDomRewardQueries')

module.exports = class DomTestAssembly {
  constructor($domNode) {
    this.transfers = new TestDomTransfers({ $domNode })
    this.rewardQueries = new TestDomRewardQueries({ $domNode })
  }
}