module.exports = class TestDomRewardQueries {
  constructor({ $domNode }) {
    this.$domNode = $domNode
  }

  async getAccountHolderInfo(accountHolderId) {
    return makeAccountHolderInfo(this.$domNode.querySelector(`[data-account-holder-id="${accountHolderId}"]`))
  }

  async getRewards({ gitHubOrg }) {
    return [...this.$domNode.querySelectorAll('[data-type="AccountHolderInfo"]')].map(makeAccountHolderInfo)
  }
}

const makeAccountHolderInfo = $accountHolder => {
  const accountHolderInfo = {
    accountHolderId: $accountHolder.dataset.accountHolderId,
    externalIds: {},
    accounts: [...$accountHolder.querySelectorAll('[data-type="AccountInfo"]')].map(makeAccountInfo)
  }

  const $gitHubIssue = $accountHolder.querySelector('[aria-label="GitHub Issue"]')
  const $gitHubUser = $accountHolder.querySelector('[aria-label="GitHub User"]')
  const $gitHubOrg = $accountHolder.querySelector('[aria-label="GitHub Organization"]')
  if ($gitHubIssue) accountHolderInfo.externalIds.gitHubIssue = $gitHubIssue.textContent
  if ($gitHubUser) accountHolderInfo.externalIds.gitHubUser = $gitHubUser.textContent
  if ($gitHubOrg) accountHolderInfo.gitHubOrg = $gitHubOrg.textContent

  return accountHolderInfo
}

const makeAccountInfo = $account => ({
  balance: parseInt($account.querySelector('[aria-label="Balance"]').textContent),
  currency: $account.querySelector('[aria-label="Currency"]').textContent,
  messages: []
})