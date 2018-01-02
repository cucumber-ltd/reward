const assert = require('assert')
const { Given, Then } = require('cucumber')

Given('a reward has been created for {gitHubIssue}', async function(gitHubIssue) {
  const accountHolderId = this.id(gitHubIssue)
  await this.domainAssembly.rewards.create({ accountHolderId, gitHubIssue })
})

Given('the following rewards have been created:', async function(dataTable) {
  for (const [gitHubIssue] of dataTable.rows()) {
    const accountHolderId = this.id(gitHubIssue)
    await this.domainAssembly.rewards.create({ accountHolderId, gitHubIssue })
  }
})

Then('{gitHubUser} should see the following rewards for {word}:', async function(gitHubUser, gitHubOrg, dataTable) {
  const actor = await this.actor(gitHubUser)
  const accountHolderInfos = await actor.rewards({ gitHubOrg })
  const actualTable = []

  accountHolderInfos.forEach(accountHolderInfo => {
    if (actualTable.length === 0) {
      const header = ['gitHubIssue']
      for (const accountInfo of accountHolderInfo.accounts) {
        header.push(accountInfo.currency)
      }
      actualTable.push(header)
    }

    const row = [accountHolderInfo.externalIds['gitHubIssue']]
    for (const accountInfo of accountHolderInfo.accounts) {
      row.push(accountInfo.balance)
    }
    actualTable.push(row)
  })
  assert.deepEqual(actualTable, dataTable.raw())
})