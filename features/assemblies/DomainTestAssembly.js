const BaseTestAssembly = require('./BaseTestAssembly')

module.exports = class DomainTestAssembly extends BaseTestAssembly {
  async actor(gitHubUser) {
    return new Actor(this.domain)
  }

  async start() {
  }

  async stop() {
  }
}

class Actor {
  constructor(domain) {
    this._domain = domain
  }

  async donate({ amount, currency, gitHubIssue }) {

  }

  async getBalance({ currency, gitHubIssue }) {
    return 100
  }
}