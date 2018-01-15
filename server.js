const uuid = require('uuid/v4')
const { MemoryEventStore } = require('neptunium')
const { MemoryPublisher } = require('pubsub-multi')
const CQRSAssembly = require('./src/CQRSAssembly')
const ServerAssembly = require('./src/ServerAssembly')

const eventStore = new MemoryEventStore()
const publisher = new MemoryPublisher()

const { readAssembly, writeAssembly } = new CQRSAssembly({ eventStore, publisher })
const { accountHolders, transfers } = writeAssembly
const { rewardQueries } = readAssembly

const serverAssembly = new ServerAssembly({ transfers, rewardQueries, publisher })
const port = parseInt(process.env.PORT) || 8866

async function main() {
  await createSystemAccounts()
  return serverAssembly.webServer.listen(port)
}

async function createSystemAccounts() {
  const systemAccountHolderId = uuid()
  await accountHolders.create({ accountHolderId: systemAccountHolderId })

  await createFakeData(systemAccountHolderId)
}

async function createFakeData(systemAccountHolderId) {
  const { users, rewards, transfers } = writeAssembly

  const accountHolderId = 'id-aslakhellesoy'
  await users.create({ accountHolderId, gitHubUser: 'aslakhellesoy' })

  const transactionId = uuid()

  await transfers.requestTransfer({
    transactionId,
    fromAccountHolderId: systemAccountHolderId,
    toAccountHolderId: accountHolderId,
    currency: 'USD',
    amount: 1000
  })

  await rewards.create({ accountHolderId: 'id-cucumber/cucumber#250', gitHubIssue: 'cucumber/cucumber#250' })
  await rewards.create({ accountHolderId: 'id-cucumber/cucumber#251', gitHubIssue: 'cucumber/cucumber#251' })
}

main()
  .then(port => console.log(`Reward ready on http://localhost:${port}`))
  .catch(err => console.error(err))