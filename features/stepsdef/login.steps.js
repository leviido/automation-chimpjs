
import  LoginPage  from  '../pages/login.page';
import {Sut} from '../support/world';


module.exports = function() {

    /**
     * Login with default user and password
     * The defaults are placed in world.js
     *
     * Note, simple Login process is expected to complete up to 5 seconds.
     */
    this.When(/^I login to e-commerce$/, {timeout: 12 * 1000}, function () {
        var defaultUser = Sut.Users.default_user
        var defaultPassword = Sut.Users.default_password
        LoginPage.login(defaultUser, defaultPassword);
    });
}
