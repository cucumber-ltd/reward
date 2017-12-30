const { buildCommandBus } = require('neptunium')
const { PubSub } = require('pubsub-multi')

const DomainRewards = require('./ports/rewards/DomainRewards')
const DomainVoters = require('./ports/voters/DomainVoters')
const DomainDeposits = require('./ports/deposits/DomainDeposits')
const DomainTransfers = require('./ports/transfers/DomainTransfers')
const TransferSaga = require('./aggregates/transfers/TransferSaga')

const RewardProjector = require('./ports/queries/RewardProjector')
const RewardStore = require('./ports/queries/RewardStore')
const RewardQueries = require('./ports/queries/RewardQueries')

module.exports = class DomainAssembly {
  constructor({ eventStore }) {
    const pubSub = new PubSub()
    const rewardStore = new RewardStore({ pub: pubSub })
    const rewardQueries = new RewardQueries({ rewardStore })

    const projectors = [
      new RewardProjector({ rewardStore, rewardQueries })
    ]
    const sagaClasses = [
      TransferSaga
    ]
    const commandBus = buildCommandBus(eventStore, projectors, sagaClasses)

    const rewards = new DomainRewards({ commandBus })
    const voters = new DomainVoters({ commandBus })
    const deposits = new DomainDeposits({ commandBus })
    const transfers = new DomainTransfers({ commandBus })

    this.rewards = rewards
    this.voters = voters
    this.deposits = deposits
    this.transfers = transfers
    this.rewardQueries = rewardQueries

    this.pub = pubSub
    this.sub = pubSub
  }
}