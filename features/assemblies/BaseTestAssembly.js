const uuid = require('uuid/v4')
const { MemoryEventStore } = require('neptunium')
const DomainAssembly = require('../../src/DomainAssembly')

module.exports = class BaseTestAssembly {
  constructor() {
    this._ids = new Map()

    const eventStore = new MemoryEventStore()
    this.domain = new DomainAssembly({ eventStore })
  }

  id(name) {
    if (!this._ids.has(name))
      this._ids.set(name, `${name}-${uuid()}`)
    return this._ids.get(name)
  }
}