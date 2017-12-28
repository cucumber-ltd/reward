const uuid = require('uuid/v4')
const BaseTestAssembly = require('./BaseTestAssembly')

module.exports = class DomainTestAssembly extends BaseTestAssembly {
  async actor(gitHubUser) {
    const id = this.id.bind(this)
    const transfers = this.domain.transfers
    const rewardQueries = this.domain.rewardQueries
    return new Actor({ gitHubUser, id, transfers, rewardQueries })
  }

  async start() {
  }

  async stop() {
  }
}

class Actor {
  constructor({ gitHubUser, id, transfers, rewardQueries }) {
    this._gitHubUser = gitHubUser
    this._id = id
    this._transfers = transfers
    this._rewardQueries = rewardQueries
  }

  async transfer({ amount, currency, gitHubIssue }) {
    const fromAccountId = this._id(this._gitHubUser)
    const toAccountId = this._id(gitHubIssue)
    const transferId = uuid()
    await this._transfers.requestTransfer({ transferId, fromAccountId, toAccountId, currency, amount })
  }

  async getBalance({ currency, gitHubIssue }) {
    const accountInfo = await this._rewardQueries.getAccountInfoByExternalId(gitHubIssue)
    const currencyAccountInfo = accountInfo.currencies[currency]
    return currencyAccountInfo ? currencyAccountInfo.balance : 0
  }
}