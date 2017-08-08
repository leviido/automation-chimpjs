
const HomePage = require('../pages/home.page');


module.exports = function() {

    this.When(/^I create new "([^"]*)" project$/, function (appType) {
        HomePage.create_new_project(appType);
    });

    this.When(/^I create new "([^"]*)" project with the name "([^"]*)"$/, function (appType, project_name) {
        HomePage.create_new_project(appType, project_name);
    });
}
