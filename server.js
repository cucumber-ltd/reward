const { MemoryEventStore } = require('neptunium')
const DomainAssembly = require('./src/DomainAssembly')
const ServerAssembly = require('./src/ServerAssembly')

const eventStore = new MemoryEventStore()
const domainAssembly = new DomainAssembly({ eventStore })
const serverAssembly = new ServerAssembly(domainAssembly)
const port = parseInt(process.env.PORT) || 8866

serverAssembly.webServer.listen(port)
  .then(port => console.log(`Reward ready on http://localhost:${port}`))
  .catch(err => console.error(err))