const verifyRewardQueriesContract = require('./verifyRewardQueriesContract')

describe('RewardQueries', () => {
  verifyRewardQueriesContract(async ({ rewardQueries }) => rewardQueries)
})