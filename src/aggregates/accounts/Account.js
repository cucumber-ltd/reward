const { Entity, Event } = require('neptunium')

module.exports = class Account extends Entity {
  async create({ externalId }) {
    await this.trigger(AccountCreated, { externalId })
  }

  async deposit({ transferId, currency, amount }) {
    await this.trigger(AccountCredited, { transferId, currency, amount })
  }

  async withdraw({ transferId, currency, amount }) {
    const balance = this._getBalance(currency)
    if (balance < amount) {
      await this.trigger(AccountDebitFailedDueToInsufficientFunds, { transferId, currency, amount })
    } else {
      await this.trigger(AccountDebited, { transferId, currency, amount })
    }
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

  onAccountDebited({ currency, amount }) {
    const balance = this._balances.get(currency)
    this._balances.set(currency, balance - amount)
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
  transferId: 'string',
  currency: 'string',
  amount: 'number'
}

class AccountDebited extends Event {
}

AccountDebited.properties = {
  transferId: 'string',
  currency: 'string',
  amount: 'number'
}

class AccountDebitFailedDueToInsufficientFunds extends Event {
}

AccountDebitFailedDueToInsufficientFunds.properties = {
  transferId: 'string',
  currency: 'string',
  amount: 'number'
}
