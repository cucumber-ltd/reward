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

  async allowUnlimitedOverdraft({ currency }) {
    await this.trigger(UnlimitedOverdraftAllowed, { currency })
  }

  async deposit({ transactionId, currency, amount }) {
    await this.trigger(AccountCredited, { transactionId, currency, amount })
  }

  async withdraw({ transactionId, currency, amount }) {
    const account = this._accounts.get(currency)
    if (account.canWithdraw(amount)) {
      await this.trigger(AccountDebited, { transactionId, currency, amount })
    } else {
      await this.trigger(AccountDebitFailedDueToInsufficientFunds, { transactionId, currency, amount })
    }
  }

  onAccountHolderCreated({}) {
    this._accounts = new Map()
  }

  onAccountAdded({ currency }) {
    this._accounts.set(currency, new Account())
  }

  onUnlimitedOverdraftAllowed({ currency }) {
    const account = this._accounts.get(currency)
    account.setCreditLimit(Number.POSITIVE_INFINITY)
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
    this._creditLimit = 0
  }

  get balance() {
    return this._balance
  }

  setCreditLimit(creditLimit) {
    this._creditLimit = creditLimit
  }

  canWithdraw(amount) {
    return 0 <= (this._balance + this._creditLimit) - amount
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

class UnlimitedOverdraftAllowed extends Event {
}

UnlimitedOverdraftAllowed.properties = {
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
