const Fetch22 = require('fetch-22')
const EventSourcePublisher = require('pubsub-multi/src/EventSourcePublisher')
const HttpTransfers = require('./ports/transfers/HttpTransfers')
const HttpRewardQueries = require('./ports/queries/HttpRewardQueries')

module.exports = class HttpAssembly {
  constructor({ baseUrl, fetch, EventSource }) {
    const fetch22 = new Fetch22({ baseUrl, fetch })
    const eventSource = new EventSource(`${baseUrl}/pubsub`)

    this.publisher = new EventSourcePublisher({ fetch22, eventSource })
    this.transfers = new HttpTransfers({ fetch22 })
    this.rewardQueries = new HttpRewardQueries({ fetch22 })
  }
}