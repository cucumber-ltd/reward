const RewardProjector = require('./ports/queries/RewardProjector')
const RewardStore = require('./ports/queries/RewardStore')
const RewardQueries = require('./ports/queries/RewardQueries')

module.exports = class ReadAssembly {
  constructor({ pub }) {
    const rewardStore = new RewardStore({ pub })
    const rewardQueries = new RewardQueries({ rewardStore })

    this.projectors = [
      new RewardProjector({ rewardStore, rewardQueries })
    ]
    this.rewardQueries = rewardQueries
  }
}