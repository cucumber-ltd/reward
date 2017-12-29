const uuid = require('uuid/v4')
const { SignalTrace } = require('subpub')
const BaseTestAssembly = require('./BaseTestAssembly')

module.exports = class DomainTestAssembly extends BaseTestAssembly {
  async actor(gitHubUser) {
    const id = this.id.bind(this)
    return new Actor({ gitHubUser, id, domain: this.domain })
  }

  async start() {
  }

  async stop() {
  }
}

class Actor {
  constructor({ gitHubUser, id, domain }) {
    this._gitHubUser = gitHubUser
    this._id = id
    this._domain = domain
  }

  async transfer({ currency, amount, gitHubIssue }) {
    const fromAccountId = this._id(this._gitHubUser)
    const toAccountId = this._id(gitHubIssue)
    const trace = new SignalTrace(this._domain.sub)
    await trace.start()
    const transferId = uuid()
    await this._domain.transfers.requestTransfer({ transferId, fromAccountId, toAccountId, currency, amount })
    await trace.containsSignal(transferId)
  }

  async getBalance({ currency, externalId }) {
    const accountId = this._id(externalId)
    const accountInfo = await this._domain.rewardQueries.getAccountInfo(accountId)
    const currencyAccountInfo = accountInfo.currencies[currency]
    return currencyAccountInfo ? currencyAccountInfo.balance : 0
  }
}