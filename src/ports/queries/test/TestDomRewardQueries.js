module.exports = class TestDomRewardQueries {
  constructor({ $domNode }) {
    if (!$domNode) throw new Error('No $domNode')
    this.$domNode = $domNode
  }

  async getAccountHolderInfo(accountHolderId) {
    return makeAccountHolderInfo(this.$domNode.querySelector(`[data-account-holder-id="${accountHolderId}"]`))
  }

  async getRewards({ gitHubOrg }) {
    return [...this.$domNode.querySelectorAll('[data-type="AccountHolderInfo"]')].map(makeAccountHolderInfo)
  }
}

const makeAccountHolderInfo = $accountHolder => ({
  accountHolderId: $accountHolder.dataset.accountHolderId,
  externalIds: {
    gitHubIssue: $accountHolder.querySelector('[aria-label="GitHub Issue"]').textContent
  },
  accounts: [...$accountHolder.querySelectorAll('[data-type="AccountInfo"]')].map(makeAccountInfo)
})

const makeAccountInfo = $account => ({
  balance: parseInt($account.querySelector('[aria-label="Balance"]').textContent),
  currency: $account.querySelector('[aria-label="Currency"]').textContent,
  messages: []
})