const ReadAssembly = require('./ReadAssembly')
const WriteAssembly = require('./WriteAssembly')

module.exports = class CQRSAssembly {
  constructor({ eventStore, pub }) {
    this.readAssembly = new ReadAssembly({ pub })
    const { projectors } = this.readAssembly
    this.writeAssembly = new WriteAssembly({ eventStore, projectors })
  }
}