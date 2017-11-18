
const HomePage = require('../pages/home.page');


module.exports = function() {

    /** creates new project (draft) with a default name
     **/

    this.When(/^I create new "([^"]*)" project$/, function (appType) {
        HomePage.create_new_project(appType);
    });

    /** creates new project (draft) with a given name
      **/
    this.When(/^I create new "([^"]*)" project with the name "([^"]*)"$/, function (appType, project_name) {
        HomePage.create_new_project(appType, project_name);
    });
}
