const { defineParameterType } = require('cucumber')

defineParameterType({
  name: 'gitHubIssue',
  regexp: /[\w-]+\/[\w-]+#\d+/,
})

defineParameterType({
  name: 'gitHubUser',
  regexp: /@([\w-/]+)/,
})

defineParameterType({
  name: 'currency',
  regexp: /(votes|commit-days|USD)/,
})
