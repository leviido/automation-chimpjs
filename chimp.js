var gutil           = require('gulp-util');
var portSelenium    = Math.floor(Math.random() * 5000) + 1000;
var portWebDriverio = Math.floor(Math.random() * 9000) + 1000;

gutil.log('Selenium running in port:    ' + gutil.colors.bold.white.bgBlue(portSelenium));
gutil.log('WebDriverio running in port: ' + gutil.colors.bold.white.bgBlue(portWebDriverio));

module.exports = {
    before: function() {
        require('babel-register');
    },

    // - - - - CHIMP - - - -
    watch: false,
    watchTags: '@watch',
    e2eTags: '@e2e',
    offline: false,
    showXolvioMessages: false,

    // - - - - CUCUMBER - - - -
    path: './features',
    format: 'pretty',
    tags: ['~@wip', '~@ignore'],
    chai: true,
    recommendedFilenameSeperator: '_',
    screenshotsOnError: true,
    screenshotsPath: 'screenshots',
    captureAllStepScreenshots: false,
    saveScreenshotsToDisk: true,
    saveScreenshotsToReport: true,
    singleSnippetPerFile: true,
    jsonOutput: 'output.json',
    failFast: true,


    // - - - - Webdriver.IO - - - -
    waitforTimeout: 30000, // time to wait until element appears
    waitforInterval: 250, // KEEP SMALL (!!!) this is the INTERVAL in which waitFor* is looped for checks
    capabilities: [{
        browserName: 'chrome',
        logLevel: 'verbose',
        chromeOptions: {
            args: ['disable-web-security']
        }
    }],
    coloredLogs: true,
    logLevel: 'verbose',

    // - - - - DEBUGGING  - - - -
    log: 'verbose',
    debug: false,
    seleniumDebug: true,
    webdriverLogLevel: 'verbose',
};