const express = require('express')
const bodyParser = require('body-parser')
const { asyncRouter, respond, WebServer } = require('express-extensions')
const { subRouter } = require('pubsub-multi')

module.exports = class ServerAssembly {
  constructor({ transfers, rewardQueries, sub }) {
    const app = express()
    app.use(express.static('./public'))
    app.use(bodyParser.json())
    app.use(bodyParser.text())
    app.use(subRouter({ sub }))

    const router = asyncRouter()

    router.$get('/accounts/:accountHolderId', async (req, res) => {
      const { accountHolderId } = req.params
      const accountHolderInfo = await rewardQueries.getAccountHolderInfo(accountHolderId)
      respond(accountHolderInfo, res)
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
