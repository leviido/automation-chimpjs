Feature: order genes
 As a user
 I want to upload genes file
 so I will be able to order the genes

 Background:
  Given I have opened e-commerce
  When I login to e-commerce

Scenario: order 20 genes in plate 96
 When I create new "GENES_FRAG" project
 And  upload file "genes_20_standards.xlsx"
 Then I should get total pricing of "$1,786.05"
 #And I should be able to ask for a quote

 Scenario: order 20 genes in tube. Tube should add $50 to the total price
  When I create new "GENES_FRAG" project with the name "auto_test"
  And  upload file "genes_20_standards.xlsx"
  Then I should get total pricing of "$1,786.05"
  And I select tube as the delivery format
  And I should get total pricing of "$1,836.05"
  #And I should be able to ask for a quote


 @wip
 Scenario: order 20 genes after edtiting a sequence of one gene
  When I create new "GENES_FRAG" project with the name "auto_test"
  And  upload file "genes_20_standards.xlsx"
  Then I should get total pricing of "$1,786.05"
  And I add "AATGACTACCGAACTCTT" to gene "Seq2"
  Then I should get total pricing of "$1,836.05"
  And I should be able to ask for a quote



