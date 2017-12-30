const uuid = require('uuid/v4')
const { SignalTrace } = require('pubsub-multi')
const { MemoryEventStore } = require('neptunium')
const DomainAssembly = require('../../src/DomainAssembly')

module.exports = class BaseTestAssembly {
  constructor() {
    this._ids = new Map()

    const eventStore = new MemoryEventStore()
    this.domainAssembly = new DomainAssembly({ eventStore })
  }

  async actor(gitHubUser) {
    return new Actor({
      gitHubUser,
      world: this
    })
  }

  id(name) {
    if (!this._ids.has(name))
      this._ids.set(name, `${name}-${uuid()}`)
    return this._ids.get(name)
  }
}

class Actor {
  constructor({ gitHubUser, world }) {
    this.gitHubUser = gitHubUser
    this.world = world
  }

  async transfer({ currency, amount, gitHubIssue }) {
    // TODO: Move to start, or to actor method
    const trace = new SignalTrace(this.world.sub)
    await trace.start()
    await this.world.pub.subscriptions(null, 1)

    const fromAccountId = this.world.id(this.gitHubUser)
    const toAccountId = this.world.id(gitHubIssue)
    const transferId = uuid()
    await this.world.transfers.requestTransfer({ transferId, fromAccountId, toAccountId, currency, amount })
    await trace.containsSignal(transferId)
  }

  async getBalance({ currency, externalId }) {
    const accountId = this.world.id(externalId)
    const accountInfo = await this.world.rewardQueries.getAccountInfo(accountId)
    const currencyAccountInfo = accountInfo.currencies[currency]
    return currencyAccountInfo ? currencyAccountInfo.balance : 0
  }
}