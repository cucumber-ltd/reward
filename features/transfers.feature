Feature: Transfers

  Scenario: Transfer USD to an issue
    Given a reward has been created for cucumber/cucumber#250
    And 300 USD has been deposited to @aslakhellesoy's account
    When @aslakhellesoy transfers 100 USD to cucumber/cucumber#250
    Then @aslakhellesoy should see that cucumber/cucumber#250 has 100 USD
    And @aslakhellesoy should have 200 USD

  Scenario: Insufficient funds to transfer
    Given a reward has been created for cucumber/cucumber#250
    And 50 USD has been deposited to @aslakhellesoy's account
    When @aslakhellesoy transfers 100 USD to cucumber/cucumber#250
    Then @aslakhellesoy should see that cucumber/cucumber#250 has 0 USD
    And @aslakhellesoy should have 50 USD

  Scenario: Transfer twice
    Given 1000 USD has been deposited to @aslakhellesoy's account
    And a reward has been created for cucumber/cucumber#250
    When @aslakhellesoy transfers 10 USD to cucumber/cucumber#250
    And @aslakhellesoy transfers 13 USD to cucumber/cucumber#250
    Then @aslakhellesoy should see that cucumber/cucumber#250 has 23 USD
    And @aslakhellesoy should have 977 USD
