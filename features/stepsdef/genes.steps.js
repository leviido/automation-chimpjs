const HomePage = require('../pages/home.page');
const GenesGridPage = require('../pages/genes_app/genes_grid.page');


module.exports = function() {

    this.Then(/^I should get total pricing$/, function () {
        GenesGridPage.wait_for_total_price(60 * 1000);
    });

   /* this.Then(/^I should get total pricing of (\d+)$/, function (expected_price) {
       GenesGridPage.wait_for_total_price(expected_price, 10 * 1000);
    });*/

    this.Then(/^I should get total pricing of "([^"]*)"$/, function (expected_price) {
        GenesGridPage.wait_for_total_price(60 * 1000, expected_price);
    });

    this.Then(/^I select tube as the delivery format$/, function () {
       GenesGridPage.select_tube();
    });

    this.Then(/^I should be able to ask for a quote$/, function () {
      GenesGridPage.ask_for_a_quote();
    });
}
