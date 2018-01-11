const uuid = require('uuid/v4')
const { MemoryPublisher } = require('pubsub-multi')
const { MemoryEventStore } = require('neptunium')
const CQRSAssembly = require('../../src/CQRSAssembly')

module.exports = class BaseTestAssembly {
  constructor() {
    this._ids = new Map()
    this._actors = new Map()

    const eventStore = new MemoryEventStore()
    const publisher = new MemoryPublisher()

    const { readAssembly, writeAssembly } = new CQRSAssembly({ eventStore, publisher })
    const { rewards, users, deposits, transfers } = writeAssembly
    const { rewardQueries } = readAssembly

    let _nextId
    this.nextId = () => {
      if (!_nextId) throw new Error('No nextId')
      const result = _nextId
      _nextId = undefined
      return result
    }
    this.setNextId = nextId => _nextId = nextId

    this.rewards = rewards
    this.users = users
    this.deposits = deposits
    this.transfers = transfers
    this.rewardQueries = rewardQueries
    this.publisher = publisher
  }

  async actor(accountHolderId) {
    if (!this._actors.has(accountHolderId)) {
      const actor = this.makeActor(accountHolderId)
      await actor.start(this.publisher)
      this._actors.set(accountHolderId, actor)
    }
    return this._actors.get(accountHolderId)
  }

  // PATTERN: Map names to entityIds
  id(name) {
    if (!name) return null
    if (!this._ids.has(name))
      this._ids.set(name, `${name}-${uuid()}`)
    return this._ids.get(name)
  }
}
