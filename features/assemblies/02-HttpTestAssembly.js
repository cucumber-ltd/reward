const fetch = require('node-fetch')
const EventSource = require('eventsource')
const HttpAssembly = require('../../src/HttpAssembly')
const ServerAssembly = require('../../src/ServerAssembly')
const Actor = require('../support/Actor')
const BaseTestAssembly = require('./BaseTestAssembly')

const port = 9875

module.exports = class HttpTestAssembly extends BaseTestAssembly {
  constructor() {
    super()
    const { transfers, rewardQueries, sub } = this
    this.serverAssembly = new ServerAssembly({ transfers, rewardQueries, sub })
  }

  makeActor(accountHolderId) {
    const baseUrl = `http://localhost:${port}`
    const httpAssembly = new HttpAssembly({ baseUrl, fetch, EventSource })
    const { sub, transfers, rewardQueries } = httpAssembly

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
