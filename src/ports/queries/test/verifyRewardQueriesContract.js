const assert = require('assert')
const { MemoryPublisher } = require('pubsub-multi')
const RewardStore = require('../RewardStore')
const RewardQueries = require('../RewardQueries')
const RewardProjector = require('../RewardProjector')

module.exports = function verifyContract(makeRewardQueries) {
  describe('RewardQueries contract', () => {

    const gitHubIssue1 = 'cucumber/cucumber#1'
    const gitHubIssue2 = 'cucumber/cucumber#2'
    const currency = 'votes'

    let queries
    beforeEach(async () => {
      const publisher = new MemoryPublisher()
      const rewardStore = new RewardStore()
      const rewardQueries = new RewardQueries({ rewardStore })
      const rewardProjector = new RewardProjector({ publisher, rewardStore, rewardQueries })

      // Create a votes account with balance 30
      for (const gitHubIssue of [gitHubIssue1, gitHubIssue2]) {
        const accountHolderId = `id-${gitHubIssue}`
        await rewardProjector.onAccountHolderCreated({ entityId: accountHolderId })
        await rewardProjector.onAccountHolderLinkedToExternalId({
          entityId: accountHolderId,
          idType: 'gitHubIssue',
          externalId: gitHubIssue
        })
        await rewardProjector.onAccountAdded({ entityId: accountHolderId, currency })
        await rewardProjector.onAccountCredited({
          entityId: accountHolderId,
          transactionId: `tx-${gitHubIssue}`,
          currency,
          amount: 30
        })
      }

      const subscriber = publisher.makeSubscriber('subscriber-id')
      queries = await makeRewardQueries({ subscriber, rewardQueries })
    })

    it('gets AccountHolder', async () => {
      const accountHolderId = `id-${gitHubIssue1}`
      const accountHolderInfo = await queries.getAccountHolderInfo(accountHolderId)
      assert.deepEqual(accountHolderInfo, {
        accountHolderId,
        externalIds: {
          gitHubIssue: gitHubIssue1
        },
        gitHubOrg: 'cucumber',
        accounts: [
          {
            currency,
            balance: 30,
            messages: []
          }
        ]
      })
    })

    xit('gets AccountHolders', async () => {
      const accountHolders = await queries.getAccountHolders()
      const accountHolderNames = accountHolders.map(accountHolder => accountHolder.name)
      assert.deepEqual(accountHolderNames, [accountHolderName])
    })
  })
}

