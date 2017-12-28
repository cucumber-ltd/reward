const { buildCommandBus } = require('neptunium')

const DomainRewards = require('./rewards/DomainRewards')
const DomainVoters = require('./voters/DomainVoters')
const DomainDeposits = require('./deposits/DomainDeposits')
const DomainTransfers = require('./transfers/DomainTransfers')
const TransferSaga = require('./transfers/TransferSaga')

const RewardProjector = require('./queries/RewardProjector')
const RewardStore = require('./queries/RewardStore')

module.exports = class DomainAssembly {
  constructor({ eventStore }) {
    const rewardStore = new RewardStore()

    const projectors = [
      new RewardProjector({ rewardStore })
    ]
    const sagas = [
      TransferSaga
    ]
    const commandBus = buildCommandBus(eventStore, projectors, sagas)

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