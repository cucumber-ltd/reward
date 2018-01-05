const verifyContract = require('./verifyRewardQueriesContract')

describe('RewardQueries', () => {
  verifyContract(async ({ rewardQueries }) => rewardQueries)
})