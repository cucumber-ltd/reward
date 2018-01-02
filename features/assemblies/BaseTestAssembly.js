const uuid = require('uuid/v4')
const { MemoryEventStore } = require('neptunium')
const DomainAssembly = require('../../src/DomainAssembly')

module.exports = class BaseTestAssembly {
  constructor() {
    this._ids = new Map()
    this._actors = new Map()

    const eventStore = new MemoryEventStore()
    this.domainAssembly = new DomainAssembly({ eventStore })
  }

  async actor(accountHolderId) {
    if (!this._actors.has(accountHolderId)) {
      const actor = this.makeActor(accountHolderId)
      await actor.start(this.domainAssembly.pub)
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
