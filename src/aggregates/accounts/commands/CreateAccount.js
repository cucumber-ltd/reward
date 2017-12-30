const ValueObject = require('value-object')
const Account = require('../Account')

module.exports = class CreateAccount extends ValueObject.define({
  accountId: 'string'
}) {
  static async process(repository, { accountId }) {
    await repository.create(Account, accountId, {})
  }
}
