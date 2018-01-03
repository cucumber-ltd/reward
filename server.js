const { MemoryEventStore } = require('neptunium')
const { PubSub } = require('pubsub-multi')
const CQRSAssembly = require('./src/CQRSAssembly')
const ServerAssembly = require('./src/ServerAssembly')

const eventStore = new MemoryEventStore()
const pubSub = new PubSub()
const pub = pubSub
const sub = pubSub

const { readAssembly, writeAssembly } = new CQRSAssembly({ eventStore, pub })
const { transfers } = writeAssembly
const { rewardQueries } = readAssembly

const serverAssembly = new ServerAssembly({ transfers, rewardQueries, sub })
const port = parseInt(process.env.PORT) || 8866

serverAssembly.webServer.listen(port)
  .then(port => console.log(`Reward ready on http://localhost:${port}`))
  .catch(err => console.error(err))