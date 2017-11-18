"use strict";

import {Page} from './page'
import * as HomePage from './home.page';

const default_login_timeout = 10 * 1000;

class LoginPage extends Page {
    constructor() {
        super();
        if(!LoginPage.instance){
            LoginPage.instance = this;
        }

        return LoginPage.instance
    }

    get username()  {  return browser.element('#user_email'); }
    get password()  {  return browser.element('#user_password'); }
    get login_btn() {  return browser.element('.primary-button'); }

    /* navigate to the login page */
    navigate() {
      // nothing to do here nnow
    }

    login(user, password) {
        try {
            if (HomePage.isLoggedIn() === false) {
                this.navigate()
                this.username.setValue(user)
                this.password.setValue(password)
                this.login_btn.click();

                // waiting for login to complete
                browser.waitUntil(function () {
                    return HomePage.isLoggedIn() === true
                }, default_login_timeout , 'Expected login to be completed by up to ' + default_login_timeout + "ms");
            } else {
                //  nothing to do. console.log("User is already logged in...");
            }
        } catch (err) {
            throw ("Login.page::login() - failed to login!\n\r" + err);
        }
    }
}

const instance = new LoginPage();
Object.freeze(instance);

export default instance;
