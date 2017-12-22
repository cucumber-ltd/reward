Feature: Donations

  Scenario: Donate to an issue
    Given a reward has been created for cucumber/cucumber#250
    And 300 USD has been deposited to @aslakhellesoy's account
    When @aslakhellesoy donates 100 USD to cucumber/cucumber#250
    Then @aslakhellesoy should see that cucumber/cucumber#250 has 100 USD