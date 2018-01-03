const { buildCommandBus } = require('neptunium')

const DomainRewards = require('./ports/rewards/DomainRewards')
const DomainUsers = require('./ports/users/DomainUsers')
const DomainDeposits = require('./ports/deposits/DomainDeposits')
const DomainTransfers = require('./ports/transfers/DomainTransfers')
const TransferSaga = require('./aggregates/transfers/TransferSaga')

module.exports = class WriteAssembly {
  constructor({ eventStore, projectors }) {
    const sagaClasses = [
      TransferSaga
    ]
    const commandBus = buildCommandBus(eventStore, projectors, sagaClasses)

    this.rewards = new DomainRewards({ commandBus })
    this.users = new DomainUsers({ commandBus })
    this.deposits = new DomainDeposits({ commandBus })
    this.transfers = new DomainTransfers({ commandBus })
  }
}