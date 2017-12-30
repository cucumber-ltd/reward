const fetch = require('node-fetch')
const EventSource = require('eventsource')
const Fetch22 = require('fetch-22')
const { EventSourceSub } = require('pubsub-multi')
const BaseTestAssembly = require('./BaseTestAssembly')
const ServerAssembly = require('../../src/ServerAssembly')
const HttpTransfers = require('../../src/ports/transfers/HttpTransfers')
const HttpRewardQueries = require('../../src/ports/queries/HttpRewardQueries')

const port = 9875

module.exports = class HttpTestAssembly extends BaseTestAssembly {
  constructor() {
    super()
    const serverAssembly = new ServerAssembly(this.domainAssembly)
    const baseUrl = `http://localhost:${port}`
    const fetch22 = new Fetch22({ baseUrl, fetch })
    const eventSource = new EventSource(`${baseUrl}/pubsub`)

    this.pub = this.domainAssembly.pub
    this.sub = new EventSourceSub({ fetch22, eventSource })
    this.transfers = new HttpTransfers({ fetch22 })
    this.rewardQueries = new HttpRewardQueries({ fetch22 })
    this.serverAssembly = serverAssembly
  }

  async start() {
    await this.serverAssembly.webServer.listen(port)
  }

  async stop() {
    await this.serverAssembly.webServer.stop()
  }
}
