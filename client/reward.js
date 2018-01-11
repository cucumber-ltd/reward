const uuid = require('uuid/v4')
const ReactAssembly = require('../src/ReactAssembly')
const HttpAssembly = require('../src/HttpAssembly')
require("bulma/css/bulma.css")

const baseUrl = ''
const fetch = window.fetch.bind(window)
const EventSource = window.EventSource
const { transfers, rewardQueries, publisher } = new HttpAssembly({ baseUrl, fetch, EventSource })

const $domNode = document.getElementById('reward')
const accountHolderId = 'id-aslakhellesoy'
const subscriber = publisher.makeSubscriber()
new ReactAssembly({ nextId: uuid, subscriber, transfers, rewardQueries, accountHolderId, $domNode })