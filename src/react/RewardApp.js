const React = require('react')
const hyperx = require('hyperx')
function createElement(Component, props, children) {
  return React.createElement(Component, props, ...children)
}
const hx = hyperx(createElement)

module.exports = class RewardApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { rewards: [] }
  }

  componentDidMount() {
    this._streamState()
      .catch(err => console.error('Failed to subscribe', err))
  }

  async _streamState() {
    const rerender = async () => {
      const rewards = await this.props.rewardQueries.getRewards({ gitHubOrg: 'cucumber' })
      this.setState({ rewards })
    }
    // TODO: Subscribe to gitHubOrg
    await this.props.sub.subscribe('TODO', rerender)
    await rerender()
  }

  render() {
    return hx`
      <div>
        ${this.state.rewards.map(reward => Reward({ reward }))}
      </div>`
  }
}

const Reward = ({ reward }) => {
  return hx`
    <div key="${reward.accountHolderId}" data-account-holder-id="${reward.accountHolderId}" data-type="AccountHolderInfo">
      <h2 aria-label="GitHub Issue">${reward.externalIds.gitHubIssue}</h2>
      ${reward.accounts.map(account => Account({ account, key: account.currency }))}
    </div>`
}

const Account = ({ account }) => {
  return hx`
    <div key="${account.currency}" data-account-currency="${account.currency}" data-type="AccountInfo">
      <h3>
        <span key="balance" aria-label="Balance">${account.balance}</span>
        <span key="currency" aria-label="Currency">${account.currency}</span>
      </h3>
    </div>`
}
