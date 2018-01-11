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
    const { publisher, transfers, rewardQueries } = this
    this.serverAssembly = new ServerAssembly({ publisher, transfers, rewardQueries })
  }

  makeActor(accountHolderId) {
    const baseUrl = `http://localhost:${port}`
    const httpAssembly = new HttpAssembly({ baseUrl, fetch, EventSource })
    const { publisher, transfers, rewardQueries } = httpAssembly
    return new Actor({ accountHolderId, publisher, transfers, rewardQueries })
  }

  async start() {
    await this.serverAssembly.webServer.listen(port)
  }

  async stop() {
    await this.serverAssembly.webServer.stop()
  }
}
