Feature: List Rewards

  Scenario: List Rewards
    Given the following rewards have been created:
      | gitHubIssue                |
      | cucumber/cucumber#250      |
      | cucumber/cucumber#252      |
      | EventSource/eventsource#12 |
    Then @aslakhellesoy should see the following rewards for cucumber:
      | gitHubIssue           | USD |
      | cucumber/cucumber#250 |   0 |
      | cucumber/cucumber#252 |   0 |
