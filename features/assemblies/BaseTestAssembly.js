const uuid = require('uuid/v4')
const { PubSub } = require('pubsub-multi')
const { MemoryEventStore } = require('neptunium')
const CQRSAssembly = require('../../src/CQRSAssembly')

module.exports = class BaseTestAssembly {
  constructor() {
    this._ids = new Map()
    this._actors = new Map()

    const eventStore = new MemoryEventStore()
    const pubSub = new PubSub()
    const pub = pubSub
    const sub = pubSub

    const { readAssembly, writeAssembly } = new CQRSAssembly({ eventStore, pub })
    const { rewards, users, deposits, transfers } = writeAssembly
    const { rewardQueries } = readAssembly

    this.rewards = rewards
    this.users = users
    this.deposits = deposits
    this.transfers = transfers
    this.rewardQueries = rewardQueries
    this.pub = pub
    this.sub = sub
  }

  async actor(accountHolderId) {
    if (!this._actors.has(accountHolderId)) {
      const actor = this.makeActor(accountHolderId)
      await actor.start(this.pub)
      this._actors.set(accountHolderId, actor)
    }
    return this._actors.get(accountHolderId)
  }

  id(name) {
    if (!name) return null
    if (!this._ids.has(name))
      this._ids.set(name, `${name}-${uuid()}`)
    return this._ids.get(name)
  }
}
