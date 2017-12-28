const ValueObject = require('value-object')
const Account = require('../Account')

module.exports = class Deposit extends ValueObject.define({
  accountId: 'string',
  transferId: 'string',
  currency: 'string',
  amount: 'number',
}) {
  static async process(repository, { accountId, transferId, currency, amount }) {
    const account = await repository.load(Account, accountId)
    await account.deposit({ transferId, currency, amount })
  }
}
