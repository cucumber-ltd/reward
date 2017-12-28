const { buildCommandBus } = require('neptunium')

const DomainRewards = require('./ports/rewards/DomainRewards')
const DomainVoters = require('./ports/voters/DomainVoters')
const DomainDeposits = require('./ports/deposits/DomainDeposits')
const DomainTransfers = require('./ports/transfers/DomainTransfers')
const TransferSaga = require('./aggregates/transfers/TransferSaga')

const RewardProjector = require('./ports/queries/RewardProjector')
const RewardStore = require('./ports/queries/RewardStore')

module.exports = class DomainAssembly {
  constructor({ eventStore }) {
    const rewardStore = new RewardStore()

    const projectors = [
      new RewardProjector({ rewardStore })
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
    this.rewardQueries = rewardStore.getQueries()
  }
}