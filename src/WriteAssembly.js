const { buildCommandBus } = require('neptunium')

const DomainRewards = require('./ports/rewards/DomainRewards')
const DomainUsers = require('./ports/users/DomainUsers')
const DomainAccountHolders = require('./ports/accountHolders/DomainAccountHolders')
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
    this.accountHolders = new DomainAccountHolders({ commandBus })
    this.transfers = new DomainTransfers({ commandBus })
  }
}