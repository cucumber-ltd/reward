const { Entity, Event } = require('neptunium')

module.exports = class TransferRequest extends Entity {
  async create({ fromAccountHolderId, toAccountHolderId, currency, amount }) {
    await this.trigger(TransferRequested, { fromAccountHolderId, toAccountHolderId, currency, amount })
  }
}

class TransferRequested extends Event {
}

TransferRequested.properties = {
  fromAccountHolderId: 'string',
  toAccountHolderId: 'string',
  currency: 'string',
  amount: 'number'
}
