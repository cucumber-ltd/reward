module.exports = class RewardStore {
  constructor() {
    this._accountHolderInfoByAccountId = new Map()
    this._accountHolderIdsByGitHubOrg = new Map()
  }

  async createAccountHolderInfo({ accountHolderInfo }) {
    this._accountHolderInfoByAccountId.set(accountHolderInfo.accountHolderId, accountHolderInfo)
  }

  async linkAccountHolderInfo({ accountHolderId, gitHubOrg }) {
    if (!this._accountHolderIdsByGitHubOrg.has(gitHubOrg)) {
      this._accountHolderIdsByGitHubOrg.set(gitHubOrg, new Set())
    }
    this._accountHolderIdsByGitHubOrg.get(gitHubOrg).add(accountHolderId)
  }

  async updateAccountHolderInfo({ accountHolderInfo, transactionId }) {
    this._accountHolderInfoByAccountId.set(accountHolderInfo.accountHolderId, accountHolderInfo)
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