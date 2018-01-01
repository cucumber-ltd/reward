const ValueObject = require('value-object')
const AccountHolder = require('../AccountHolder')

module.exports = class Deposit extends ValueObject.define({
  accountHolderId: 'string',
  transactionId: 'string',
  currency: 'string',
  amount: 'number',
}) {
  static async process(repository, { accountHolderId, transactionId, currency, amount }) {
    const accountHolder = await repository.load(AccountHolder, accountHolderId)
    await accountHolder.deposit({ transactionId, currency, amount })
  }
}
