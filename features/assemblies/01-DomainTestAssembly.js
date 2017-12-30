const BaseTestAssembly = require('./BaseTestAssembly')

module.exports = class DomainTestAssembly extends BaseTestAssembly {
  constructor() {
    super()

    this.pub = this.domainAssembly.pub
    this.sub = this.domainAssembly.sub
    this.transfers = this.domainAssembly.transfers
    this.rewardQueries = this.domainAssembly.rewardQueries
  }

  async start() {
  }

  async stop() {
  }
}
