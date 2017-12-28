const { Entity, Event } = require('neptunium')

module.exports = class Account extends Entity {
  async create({ externalId }) {
    await this.trigger(AccountCreated, { externalId })
  }

  async credit({ currency, amount }) {
    await this.trigger(AccountCredited, { currency, amount })
  }

  async requestTransfer({ toAccountId, currency, amount }) {
    const balance = this._getBalance(currency)
    if (balance < amount) throw new Error(`Insufficient funds: ${balance} < ${amount}`)
    await this.trigger(TransferApproved, { toAccountId, currency, amount })
  }

  async executeTransfer({ fromAccountId, currency, amount }) {
    await this.trigger(TransferExecuted, { fromAccountId, currency, amount })
  }

  _getBalance(currency) {
    const balance = this._balances.get(currency)
    if (balance === undefined) throw new Error(`Unknown currency: ${currency}`)
    return balance
  }

  onAccountCreated({}) {
    this._balances = new Map()
    this._balances.set('USD', 0)
  }

  onAccountCredited({ currency, amount }) {
    const balance = this._balances.get(currency)
    this._balances.set(currency, balance + amount)
  }

  onTransferApproved({ currency, amount }) {
    const balance = this._balances.get(currency)
    this._balances.set(currency, balance - amount)
  }

  onTransferExecuted({ currency, amount }) {
    const balance = this._balances.get(currency)
    this._balances.set(currency, balance + amount)
  }
}

class AccountCreated extends Event {
}

AccountCreated.properties = {
  externalId: 'string'
}

class AccountCredited extends Event {
}

AccountCredited.properties = {
  currency: 'string',
  amount: 'number'
}

class TransferApproved extends Event {
}

TransferApproved.properties = {
  toAccountId: 'string',
  currency: 'string',
  amount: 'number'
}

class TransferExecuted extends Event {
}

TransferExecuted.properties = {
  fromAccountId: 'string',
  currency: 'string',
  amount: 'number'
}