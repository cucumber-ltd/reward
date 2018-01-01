const { Entity, Event } = require('neptunium')

module.exports = class AccountHolder extends Entity {
  async create({}) {
    await this.trigger(AccountHolderCreated, {})
  }

  async linkToExternalId({ idType, externalId }) {
    await this.trigger(AccountHolderLinkedToExternalId, { idType, externalId })
  }

  async addAccount({ currency }) {
    await this.trigger(AccountAdded, { currency })
  }

  async deposit({ transactionId, currency, amount }) {
    await this.trigger(AccountCredited, { transactionId, currency, amount })
  }

  async withdraw({ transactionId, currency, amount }) {
    const account = this._accounts.get(currency)
    if (account.balance < amount) {
      await this.trigger(AccountDebitFailedDueToInsufficientFunds, { transactionId, currency, amount })
    } else {
      await this.trigger(AccountDebited, { transactionId, currency, amount })
    }
  }

  onAccountAdded({ currency }) {
    this._accounts.set(currency, new Account())
  }

  onAccountHolderCreated({}) {
    this._accounts = new Map()
  }

  onAccountCredited({ currency, amount }) {
    const account = this._accounts.get(currency)
    account.credit(amount)
  }

  onAccountDebited({ currency, amount }) {
    const account = this._accounts.get(currency)
    account.debit(amount)
  }
}

class Account {
  constructor() {
    this._balance = 0
  }

  get balance() {
    return this._balance
  }

  credit(amount) {
    this._balance += amount
  }

  debit(amount) {
    this._balance -= amount
  }
}

class AccountHolderCreated extends Event {
}

AccountHolderCreated.properties = {}

class AccountHolderLinkedToExternalId extends Event {
}

AccountHolderLinkedToExternalId.properties = {
  idType: 'string',
  externalId: 'string'
}

class AccountAdded extends Event {
}

AccountAdded.properties = {
  currency: 'string',
}

class AccountCredited extends Event {
}

AccountCredited.properties = {
  transactionId: 'string',
  currency: 'string',
  amount: 'number'
}

class AccountDebited extends Event {
}

AccountDebited.properties = {
  transactionId: 'string',
  currency: 'string',
  amount: 'number'
}

class AccountDebitFailedDueToInsufficientFunds extends Event {
}

AccountDebitFailedDueToInsufficientFunds.properties = {
  transactionId: 'string',
  currency: 'string',
  amount: 'number'
}
