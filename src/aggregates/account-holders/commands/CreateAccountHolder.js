const ValueObject = require('value-object')
const AccountHolder = require('../AccountHolder')

module.exports = class CreateAccountHolder extends ValueObject.define({
  accountHolderId: 'string'
}) {
  static async process(repository, { accountHolderId }) {
    await repository.create(AccountHolder, accountHolderId, {})
  }
}
