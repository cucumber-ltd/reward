const assert = require('assert')
const { Simulate } = require('react-dom/test-utils')

module.exports = class TestDomTransfers {
  constructor({ setNextId, $domNode }) {
    if (!setNextId) throw new Error('No setNextId')
    if (!$domNode) throw new Error('No $domNode')
    this.setNextId = setNextId
    this.$domNode = $domNode
  }

  async requestTransfer({ transactionId, fromAccountHolderId, toAccountHolderId, currency, amount }) {
    this.setNextId(transactionId)
    assert.equal(currency, 'USD')
    const $toAccountHolder = this.$domNode.querySelector(`[data-account-holder-id="${toAccountHolderId}"]`)
    const $toAccount = $toAccountHolder.querySelector(`[data-account-currency="${currency}"]`)

    const $amount = $toAccount.querySelector('[aria-label="Transfer Amount"]')
    $amount.value = String(amount)
    Simulate.change($amount)

    $toAccount.querySelector('[aria-label="Transfer"]').click()
  }
}