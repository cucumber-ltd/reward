module.exports = class TestDomRewardQueries {
  constructor($domNode) {
    this.$domNode = $domNode
  }

  async getAccountHolderInfo(accountHolderId) {
    return makeAccountHolderInfo(this.$domNode.querySelector(`[data-account-holder-id="${accountHolderId}"]`))
  }

  async getRewards({ gitHubOrg }) {
    throw new Error('TODO')
  }
}

const makeAccountHolderInfo = $accountHolder => ({
  accountHolderId: $accountHolder.dataset.accountHolderId,
  externalIds: {
    gitHubIssue: $accountHolder.querySelector('[aria-label="GitHub Issue"]').textContent
  },
  accounts: [...$accountHolder.querySelectorAll('[data-type="Account"]')].map(makeAccountInfo)
})

const makeAccountInfo = $account => ({
  balance: parseInt($account.querySelector('[aria-label="Balance"]').textContent),
  currency: $account.querySelector('[aria-label="Currency"]').textContent,
  messages: []
})