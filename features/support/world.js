'use strict';

/*Object.defineProperty(exports, "__esModule", {
    value: true
});*/

export const Sut = {
    Profile: {
        LOCAL: 'http://localhost:8080',
        DEV : 'https://ecommerce.twistbioscience-dev.com',
        QA : 'https://ecommerce.twistbioscience-qa.com',
        STAGING : 'https://ecommerce.twistbioscience-staging.com/',
        DEFAULT : 'https://ecommerce.twistbioscience-dev.com',
    },
    Users:  {
        default_user: "ilevi@twistbioscience.com",
        test_user: "test-user1-tlv@twistbioscience.com",
        admin_user: "test-admin1-tlv@twistbioscience.com",
        default_password: "Password1",
    }
}

export const appType = {
    GENES_FRAG : 1,
    OLIGO_POOLS : 2
}

export const Paths  = {
    test_data : "test_data/"
}


/**
 * returns a test_data file full path
 * @param file
 * @returns {string}
 */
export function get_test_file_fullpath(file) {
    return __dirname + "/../" + this.Paths.test_data + file;
}


/*var host = process.env.HOST || "localhost";
var port = process.env.PORT || "80";
var protocol = process.env.PROTOCOL || "http";
var stack = process.env.PLATFORM || "QA";*/

/*var buildFirefoxDriver = function() {
    return new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.firefox()).
    build();
};*/

/*var getDriver = function() {
    return driver;
};*/

/*var World = function World() {

    var defaultTimeout = 20000;
  //  var screenshotPath = "screenshots";

   // this.webdriver = webdriver;
    //this.driver = driver;

  /!*  if(!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
    }*!/

    this.waitFor = function(cssLocator, timeout) {
        var waitTimeout = timeout || defaultTimeout;
        return driver.wait(function() {
            return driver.isElementPresent({ css: cssLocator });
        }, waitTimeout);
    };
};

module.exports.World = World;*/
//module.exports.getDriver = getDriver;