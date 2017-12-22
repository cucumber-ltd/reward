const uuid = require('uuid/v4')
const DomainAssembly = require('../../src/DomainAssembly')

module.exports = class BaseTestAssembly {
  constructor() {
    this._ids = new Map()
    this.domain = new DomainAssembly()
  }

  id(name) {
    if (!this._ids.has(name))
      this._ids.set(name, `${name}-${uuid()}`)
    return this._ids.get(name)
  }
}