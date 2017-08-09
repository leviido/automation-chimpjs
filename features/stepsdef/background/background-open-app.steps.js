import {Sut} from '../../support/world';

module.exports = function() {

    /** overrides  hard-coded cucumber timeout at node_modules/chimp/dist/lib/cucumberjs/hooks.js
    @see: https://github.com/xolvio/chimp/issues/508 **/
    this.setDefaultTimeout(120 * 1000);

    /**
     * open browser, if not opened, and navigate to the baseUrl.
     * The baseUrl property is assumed to be located in the World.js file
     * This method will try to navigate to the baseUrl only if it finds that
     * the base Url is not part of the current url
     *
     * Note: you could put the baseUrl property also in chimp.js. and to read it like this:
     * var baseUrl = process.env['chimp.baseUrl'];
     */
    this.Given(/^I have opened e-commerce$/, function () {
        var currentUrl = browser.getUrl();

        var profile = process.env.profile;
        if (typeof profile == 'undefined') {
            profile = "DEFAULT";
        }

        let baseUrl = Sut.Profile[profile.toUpperCase()]

        /** if app is opened and url=requested_url no need do anything **/
        if(currentUrl.indexOf(baseUrl) === -1) {
            browser.url(baseUrl);
        }
    });
}