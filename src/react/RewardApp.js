const React = require('react')
const hyperx = require('hyperx')
const hx = hyperx((Component, props, children) => {
  return React.createElement(Component, props, ...(children || []))
})

module.exports = class RewardApp extends React.Component {
  constructor(props) {
    super(props)
    if (!props.nextId) throw new Error('No nextId')
    this.state = { rewards: [] }
  }

  componentDidMount() {
    this._streamState()
      .catch(err => console.error('Failed to subscribe', err.stack))
  }

  async _streamState() {
    const rerender = async () => {
      const rewards = await this.props.rewardQueries.getRewards({ gitHubOrg: 'cucumber' })
      this.setState({ rewards })
    }
    // TODO: Subscribe to gitHubOrg
    await this.props.sub.subscribe('gitHubOrg:cucumber', rerender)
    await rerender()
  }

  async _requestTransfer({ toAccountHolderId, currency, amount }) {
    const transactionId = this.props.nextId()
    const fromAccountHolderId = this.props.accountHolderId
    return this.props.transfers.requestTransfer({
      transactionId,
      fromAccountHolderId,
      toAccountHolderId,
      currency,
      amount
    })
  }

  render() {
    return hx`
      <div>
        ${this.state.rewards.map(reward => Reward({ reward, requestTransfer: this._requestTransfer.bind(this) }))}
      </div>`
  }
}

const Reward = ({ reward, requestTransfer }) => {
  const _requestTransfer = async ({ currency, amount }) => {
    return requestTransfer({ toAccountHolderId: reward.accountHolderId, currency, amount })
  }
  return hx`
    <div key="${reward.accountHolderId}" data-account-holder-id="${reward.accountHolderId}" data-type="AccountHolderInfo">
      <h2 aria-label="GitHub Issue">${reward.externalIds.gitHubIssue}</h2>
      <div>
        ${reward.accounts.map(account => Account({ account, requestTransfer: _requestTransfer }))}
      </div>
    </div>`
}

const Account = ({ account, requestTransfer }) => {
  const _requestTransfer = async ({ amount }) => {
    return requestTransfer({ currency: account.currency, amount })
  }

  return hx`
    <div key="${account.currency}" data-account-currency="${account.currency}" data-type="AccountInfo">
      <h3>
        <span aria-label="Balance">${account.balance}</span>
        <span aria-label="Currency">${account.currency}</span>
      </h3>
      ${React.createElement(TransferForm, { requestTransfer: _requestTransfer })}
    </div>`
}

class TransferForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { amount: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    // TODO: Validate it's an int
    this.setState({ amount: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const amount = parseInt(this.state.amount)
    this.props.requestTransfer({ amount })
      .catch(err => console.error(`Failed to request transfer of ${amount}: ${err.stack}`))
  }

  render() {
    return hx`
      <form onSubmit=${this.handleSubmit}>
        <input aria-label="Transfer Amount" type="text" value=${this.state.amount} onChange=${this.handleChange} />
        <input aria-label="Transfer" type="submit" value="Transfer" />
      </form>`
  }
}