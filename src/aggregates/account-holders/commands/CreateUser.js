const ValueObject = require('value-object')
const AccountHolder = require('../AccountHolder')

module.exports = class CreateAccountHolder extends ValueObject.define({
  accountHolderId: 'string',
  gitHubUser: 'string',
  currencies: ['string'],
}) {
  static async process(repository, { accountHolderId, currencies, gitHubUser }) {
    const accountHolder = await repository.create(AccountHolder, accountHolderId, {})
    await accountHolder.linkToExternalId({
      idType: 'gitHubUser',
      externalId: gitHubUser
    })
    for (const currency of currencies) {
      await accountHolder.addAccount({ currency })
    }
  }
}
