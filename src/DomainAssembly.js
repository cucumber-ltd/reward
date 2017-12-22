const DomainRewards = require('./rewards/DomainRewards')
const DomainVoters = require('./voters/DomainVoters')
const DomainDeposits = require('./deposits/DomainDeposits')

module.exports = class DomainAssembly {
  constructor() {
    const rewards = new DomainRewards()
    const voters = new DomainVoters()
    const deposits = new DomainDeposits()

    this.rewards = rewards
    this.voters = voters
    this.deposits = deposits
  }
}