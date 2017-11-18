Feature: order oligos pools
  As a user
  I want to upload a file with oligos sequences
  so I will be able to order oligp pool(s)

  Background:
    Given I have opened e-commerce

  Scenario: order of 1 pool with 5k oligos
    Given I login to e-commerce
    When I create new "OLIGO_POOLS" project
    And  upload file "oligo_5K_max.csv"
    Then I should get total pricing
    And I should be able to ask for a quote



