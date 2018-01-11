const { MemoryEventStore } = require('neptunium')
const { MemoryPublisher } = require('pubsub-multi')
const CQRSAssembly = require('./src/CQRSAssembly')
const ServerAssembly = require('./src/ServerAssembly')

const eventStore = new MemoryEventStore()
const publisher = new MemoryPublisher()

const { readAssembly, writeAssembly } = new CQRSAssembly({ eventStore, publisher })
const { transfers } = writeAssembly
const { rewardQueries } = readAssembly

const serverAssembly = new ServerAssembly({ transfers, rewardQueries, publisher })
const port = parseInt(process.env.PORT) || 8866

async function main() {
  await createFakeData()
  return serverAssembly.webServer.listen(port)
}

async function createFakeData() {
  const { users, rewards, deposits } = writeAssembly
  await users.create({ accountHolderId: 'id-aslakhellesoy', gitHubUser: 'aslakhellesoy' })
  await deposits.deposit({
    accountHolderId: 'id-aslakhellesoy',
    transactionId: 'id-txn',
    currency: 'USD',
    amount: 1000
  })
  await rewards.create({ accountHolderId: 'id-cucumber/cucumber#250', gitHubIssue: 'cucumber/cucumber#250' })
  await rewards.create({ accountHolderId: 'id-cucumber/cucumber#251', gitHubIssue: 'cucumber/cucumber#251' })
}

main()
  .then(port => console.log(`Reward ready on http://localhost:${port}`))
  .catch(err => console.error(err))