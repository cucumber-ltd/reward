const uuid = require('uuid/v4')
const ReactAssembly = require('../src/ReactAssembly')
const HttpAssembly = require('../src/HttpAssembly')
require("bulma/css/bulma.css")

const baseUrl = ''
const fetch = window.fetch.bind(window)
const EventSource = window.EventSource
const { transfers, rewardQueries, sub } = new HttpAssembly({ baseUrl, fetch, EventSource })

const $domNode = document.getElementById('reward')
const accountHolderId = 'id-aslakhellesoy'
new ReactAssembly({ nextId: uuid, subscriber: sub, transfers, rewardQueries, accountHolderId, $domNode })