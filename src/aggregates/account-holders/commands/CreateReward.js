const ValueObject = require('value-object')
const AccountHolder = require('../AccountHolder')

module.exports = class CreateReward extends ValueObject.define({
  accountHolderId: 'string',
  gitHubIssue: 'string',
  currencies: ['string']
}) {
  static async process(repository, { accountHolderId, gitHubIssue, currencies }) {
    const accountHolder = await repository.create(AccountHolder, accountHolderId, {})
    await accountHolder.linkToExternalId({
      idType: 'gitHubIssue',
      externalId: gitHubIssue
    })
    for (const currency of currencies) {
      await accountHolder.addAccount({ currency })
    }
  }
}
