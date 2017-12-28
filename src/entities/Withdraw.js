const ValueObject = require('value-object')
const Account = require('../entities/Account')

module.exports = class Withdraw extends ValueObject.define({
  accountId: 'string',
  transferId: 'string',
  currency: 'string',
  amount: 'number',
}) {
  static async process(repository, { accountId, transferId, currency, amount }) {
    const account = await repository.load(Account, accountId)
    await account.withdraw({ transferId, currency, amount })
  }
}
