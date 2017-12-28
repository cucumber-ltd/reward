const ValueObject = require('value-object')
const Account = require('../Account')

module.exports = class CreateAccount extends ValueObject.define({
  accountId: 'string',
  externalId: 'string'
}) {
  static async process(repository, { accountId, externalId }) {
    await repository.create(Account, accountId, { externalId })
  }
}
