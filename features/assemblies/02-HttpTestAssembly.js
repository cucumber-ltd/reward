const fetch = require('node-fetch')
const EventSource = require('eventsource')
const Fetch22 = require('fetch-22')
const { EventSourceSub } = require('pubsub-multi')
const BaseTestAssembly = require('./BaseTestAssembly')
const Actor = require('../support/Actor')
const ServerAssembly = require('../../src/ServerAssembly')
const HttpTransfers = require('../../src/ports/transfers/HttpTransfers')
const HttpRewardQueries = require('../../src/ports/queries/HttpRewardQueries')

const port = 9875

module.exports = class HttpTestAssembly extends BaseTestAssembly {
  constructor() {
    super()
    this.serverAssembly = new ServerAssembly(this.domainAssembly)
  }

  makeActor(accountHolderId) {
    const baseUrl = `http://localhost:${port}`
    const fetch22 = new Fetch22({ baseUrl, fetch })
    const eventSource = new EventSource(`${baseUrl}/pubsub`)

    const sub = new EventSourceSub({ fetch22, eventSource })
    const transfers = new HttpTransfers({ fetch22 })
    const rewardQueries = new HttpRewardQueries({ fetch22 })

    return new Actor({
      accountHolderId,
      sub,
      transfers,
      rewardQueries,
    })
  }

  async start() {
    await this.serverAssembly.webServer.listen(port)
  }

  async stop() {
    await this.serverAssembly.webServer.stop()
  }
}
