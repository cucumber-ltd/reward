const express = require('express')
const bodyParser = require('body-parser')
const { asyncRouter, respond, WebServer } = require('express-extensions')
const { pubSubRouter } = require('pubsub-multi')

module.exports = class ServerAssembly {
  constructor({ transfers, rewardQueries, publisher }) {
    if (!publisher) throw new Error('No publisher')
    const app = express()

    if (process.env.NODE_ENV === 'development') {
      console.log('Using WebPack Dev Middleware')
      const webpackMiddleware = require('./webpack/webpackMiddleware')
      app.use(webpackMiddleware())
    }

    app.use(express.static('./public'))
    app.use(bodyParser.json())
    app.use(bodyParser.text())
    app.use(pubSubRouter({ publisher }))

    const router = asyncRouter()

    router.$get('/accountholders/:accountHolderId', async (req, res) => {
      const { accountHolderId } = req.params
      const accountHolderInfo = await rewardQueries.getAccountHolderInfo(accountHolderId)
      respond(accountHolderInfo, res)
    })

    router.$get('/rewards/github/:gitHubOrg', async (req, res) => {
      const { gitHubOrg } = req.params
      const accountHolderInfos = await rewardQueries.getRewards({ gitHubOrg })
      respond(accountHolderInfos, res)
    })

    router.$post('/transfers', async (req, res) => {
      const { transactionId, fromAccountHolderId, toAccountHolderId, currency, amount } = req.body
      await transfers.requestTransfer({ transactionId, fromAccountHolderId, toAccountHolderId, currency, amount })
      res.status(201).end()
    })

    app.use(router)
    this.webServer = new WebServer(app)
  }
}
