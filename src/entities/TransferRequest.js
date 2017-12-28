const { Entity, Event } = require('neptunium')

module.exports = class Transfer extends Entity {
  async create({ fromAccountId, toAccountId, currency, amount }) {
    await this.trigger(TransferRequested, { fromAccountId, toAccountId, currency, amount })
  }
}

class TransferRequested extends Event {
}

TransferRequested.properties = {
  fromAccountId: 'string',
  toAccountId: 'string',
  currency: 'string',
  amount: 'number'
}
