const ValueObject = require('value-object')
const AccountHolder = require('../AccountHolder')

module.exports = class CreateAccountHolder extends ValueObject.define({
  accountHolderId: 'string',
  currencies: ['string']
}) {
  static async process(repository, { accountHolderId, currencies }) {
    const accountHolder = await repository.create(AccountHolder, accountHolderId, {})
    for (const currency of currencies) {
      await accountHolder.addAccount({ currency })
    }
  }
}
