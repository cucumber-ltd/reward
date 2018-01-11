const RewardProjector = require('./ports/queries/RewardProjector')
const RewardStore = require('./ports/queries/RewardStore')
const RewardQueries = require('./ports/queries/RewardQueries')

module.exports = class ReadAssembly {
  constructor({ publisher }) {
    if (!publisher) throw new Error('No publisher')
    const rewardStore = new RewardStore()
    const rewardQueries = new RewardQueries({ rewardStore })

    this.projectors = [
      new RewardProjector({ publisher, rewardStore, rewardQueries })
    ]
    this.rewardQueries = rewardQueries
  }
}