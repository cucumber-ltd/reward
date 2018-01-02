const { defineParameterType } = require('cucumber')

defineParameterType({
  name: 'gitHubUser',
  regexp: /@([\w-/]+)/
})

defineParameterType({
  name: 'actor',
  regexp: /@([\w-/]+)/,
  transformer(gitHubUser) {
    const accountHolderId = this.id(gitHubUser)
    return this.actor(accountHolderId)
  }
})

defineParameterType({
  name: 'gitHubIssue',
  regexp: /[\w-]+\/[\w-]+#\d+/,
})

defineParameterType({
  name: 'currency',
  regexp: /(votes|commit-days|USD)/,
})
