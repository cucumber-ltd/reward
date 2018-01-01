const uuid = require('uuid/v4')
const { SignalTrace } = require('pubsub-multi')
const { MemoryEventStore } = require('neptunium')
const DomainAssembly = require('../../src/DomainAssembly')

module.exports = class BaseTestAssembly {
  constructor() {
    this._ids = new Map()
    this._actors = new Map()

    const eventStore = new MemoryEventStore()
    this.domainAssembly = new DomainAssembly({ eventStore })
  }

  async actor(gitHubUser) {
    if (!this._actors.has(gitHubUser)) {
      const trace = new SignalTrace(this.sub)
      await trace.start()
      await this.pub.subscriptions(null, 1)
      const actor = new Actor({
        gitHubUser,
        trace,
        world: this
      })
      this._actors.set(gitHubUser, actor)
    }
    return this._actors.get(gitHubUser)
  }

  id(name) {
    if (!this._ids.has(name))
      this._ids.set(name, `${name}-${uuid()}`)
    return this._ids.get(name)
  }
}

class Actor {
  constructor({ gitHubUser, trace, world }) {
    this.gitHubUser = gitHubUser
    this.trace = trace
    this.world = world
  }

  async transfer({ currency, amount, gitHubIssue }) {
    const fromAccountHolderId = this.world.id(this.gitHubUser)
    const toAccountHolderId = this.world.id(gitHubIssue)
    const transactionId = uuid()
    await this.world.transfers.requestTransfer({ transactionId, fromAccountHolderId, toAccountHolderId, currency, amount })
    await this.trace.containsSignal(transactionId)
  }

  async getBalance({ accountHolderId, currency }) {
    const accountHolderInfo = await this.world.rewardQueries.getAccountHolderInfo(accountHolderId)
    const currencyAccountHolderInfo = accountHolderInfo.currencies[currency]
    return currencyAccountHolderInfo ? currencyAccountHolderInfo.balance : 0
  }
}