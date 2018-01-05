const { JSDOM } = require('jsdom')
const ReactAssembly = require('../../../ReactAssembly')
const TestDomRewardQueries = require('./TestDomRewardQueries')
const verifyContract = require('./verifyRewardQueriesContract')

describe('TestDomRewardQueries', () => {
  verifyContract(async ({ sub, rewardQueries }) => {
    const dom = new JSDOM(`<!DOCTYPE html>`)
    const document = dom.window.document
    global.document = document
    const $domNode = document.createElement('div')
    document.body.appendChild($domNode)

    // TODO: Add a start() method, or make this a regular function
    new ReactAssembly({ sub, rewardQueries, $domNode })
    return new TestDomRewardQueries($domNode)
  })
})