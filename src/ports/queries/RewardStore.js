module.exports = class RewardStore {
  constructor() {
    this._accountHolderInfoByAccountId = new Map()
    this._accountHolderIdsByGitHubOrg = new Map()
  }

  async createAccountHolderInfo({ accountHolderInfo }) {
    this._accountHolderInfoByAccountId.set(accountHolderInfo.accountHolderId, accountHolderInfo)
  }

  async updateAccountHolderInfo({ accountHolderInfo }) {
    this._accountHolderInfoByAccountId.set(accountHolderInfo.accountHolderId, accountHolderInfo)
    if (accountHolderInfo.gitHubOrg) {
      if (!this._accountHolderIdsByGitHubOrg.has(accountHolderInfo.gitHubOrg)) {
        this._accountHolderIdsByGitHubOrg.set(accountHolderInfo.gitHubOrg, new Set())
      }
      this._accountHolderIdsByGitHubOrg.get(accountHolderInfo.gitHubOrg).add(accountHolderInfo.accountHolderId)
    }
  }

  async _getAccountHolderInfo(accountHolderId) {
    return this._accountHolderInfoByAccountId.get(accountHolderId)
  }

  async _getRewards({ gitHubOrg }) {
    const accountHolderIds = this._accountHolderIdsByGitHubOrg.get(gitHubOrg) || new Set()
    const accountHolderInfos = [...accountHolderIds].map(accountHolderId =>
      this._accountHolderInfoByAccountId.get(accountHolderId))
    return [...accountHolderInfos]//.sort(a => )
  }
}