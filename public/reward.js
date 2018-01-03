const ReactAssembly = require('../src/ReactAssembly')
const HttpAssembly = require('../src/HttpAssembly')

const baseUrl = '/'
const fetch = window.fetch.bind(window)
const EventSource = window.EventSource
const { transfers, rewardQueries, sub } = new HttpAssembly({ baseUrl, fetch, EventSource })

const $domNode = document.getElementById('reward')
new ReactAssembly({ transfers, rewardQueries, sub, $domNode })