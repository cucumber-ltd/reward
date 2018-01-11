const ReadAssembly = require('./ReadAssembly')
const WriteAssembly = require('./WriteAssembly')

module.exports = class CQRSAssembly {
  constructor({ eventStore, publisher }) {
    if (!publisher) throw new Error('No publisher')
    this.readAssembly = new ReadAssembly({ publisher })
    const { projectors } = this.readAssembly
    this.writeAssembly = new WriteAssembly({ eventStore, projectors })
  }
}