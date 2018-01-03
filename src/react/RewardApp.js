const { createElement, Component } = require('react')
const hyperx = require('hyperx')
const hx = hyperx(createElement)

module.exports = class RewardApp extends Component {
  constructor(props) {
    super(props)
    this.state = { rewards: [] }
    console.log('new RewardApp', props)
  }

  componentDidMount() {
    console.log('componentDidMount')
    this._streamState()
      .catch(err => console.error('Failed to subscribe', err))
  }

  async _streamState() {
    const rerender = async () => {
      const rewards = await this.props.rewardQueries.getRewards({ gitHubOrg: 'cucumber' })
      this.setState({ rewards })
    }
    await rerender()
    await this.props.sub.subscribe(null, rerender)
  }

  render(a1, a2) {
    return hx`
      <div>
        ${this.state.rewards.map(reward => Reward({ reward }))}
      </div>`
  }
}

const Reward = ({ reward }) => {
  return hx`
    <div data-account-holder-id="${reward.accountHolderId}" data-type="Reward">
      <h2 aria-label="GitHub Issue">${reward.externalIds.gitHubIssue}</h2>
      ${reward.accounts.map(account => Account({ account }))}
    </div>`
}

const Account = ({ account }) => {
  return hx`
    <div data-account-currency="${account.currency}" data-type="Account">
      <h3>
        <span aria-label="Balance">${account.balance}</span>
        <span aria-label="Currency">${account.currency}</span>
      </h3>
    </div>`
}
