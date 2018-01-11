const uuid = require('uuid/v4')
const { JSDOM } = require('jsdom')
const ReactAssembly = require('../../../ReactAssembly')
const TestDomRewardQueries = require('./TestDomRewardQueries')
const verifyRewardQueriesContract = require('./verifyRewardQueriesContract')

describe('TestDomRewardQueries', () => {
  verifyRewardQueriesContract(async ({ subscriber, rewardQueries }) => {
    const dom = new JSDOM(`<!DOCTYPE html>`)
    const document = dom.window.document
    global.document = document
    const $domNode = document.createElement('div')
    document.body.appendChild($domNode)

    const nextId = uuid
    const accountHolderId = 'bogus'
    // TODO: Add a start() method, or make this a regular function
    new ReactAssembly({ nextId, subscriber, rewardQueries, accountHolderId, $domNode })
    return new TestDomRewardQueries({ $domNode })
  })
})