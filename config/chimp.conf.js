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
    watch: true,
    watchTags: '@watch,@focus',
    e2eSteps: null,
    fullDomain: false,
    domainOnly: false,
    e2eTags: '@e2e',
    watchWithPolling: false,
    server: false,
    serverPort: 8060,
    serverHost: 'localhost',
    sync: true,
    offline: false,
    showXolvioMessages: true,

    // - - - - GULP CHIMP - - - -
    singleRun:  true,

    // - - - - CUCUMBER - - - -
    path: '../features/e2e/features',
    format: 'pretty',
    tags:  ['~@wip', '~@ignore'],
    singleSnippetPerFile: true,
    recommendedFilenameSeparator: '_',
    chai: false,
    screenshotsOnError: true,
    screenshotsPath: '../e2e_output/screenshots',
    captureAllStepScreenshots: false,
    saveScreenshotsToDisk: true,
    saveScreenshotsToReport: true,
    jsonOutput: '../e2e_output/cucumber.json',
    conditionOutput: true,

    // - - - - CUCUMBER REPORT - - - -
    htmlReport: true,
    theme: 'bootstrap',
    jsonFile: '../e2e_output/cucumber.json',
    output: '../e2e_output/report/cucumber.html',
    reportSuiteAsScenarios: true,
    launchReport: true,

    // - - - - SELENIUM  - - - -
    browser: 'phantomjs',
    platform: 'ANY',
    name: '',
    user: '',
    key: '',
    port: portSelenium,
    host: null,

    // - - - - SAUCELABS - - - -
    // user: "",
    // key: "",
    // port: 80,
    // host: "ondemand.saucelabs.com",

    // - - - - WEBDRIVER-IO  - - - -
    webdriverio: {
        desiredCapabilities: {},
        logOutput: './e2e_output/logs',
        host: '127.0.0.1',
        port: portWebDriverio,
        path: '/wd/hub',
        baseUrl: 'http://localhost',
        screenshotPath: '../e2e_output/screenshots',
        waitforTimeout: 10000, // time to wait until element appears
        waitforInterval: 250, // KEEP SMALL (!!!) this is the INTERVAL in which waitFor* is looped for checks
        capabilities: [{
            browserName: 'chrome',
            chromeOptions: {
                args: ['disable-web-security']
            }
        }],
        coloredLogs: true,
        logLevel: 'verbose',
    },

    // - - - - SELENIUM-STANDALONE
    /*seleniumStandaloneOptions: {
        // check for more recent versions of selenium here:
        // http://selenium-release.storage.googleapis.com/index.html
        version: '2.53.1',
        baseURL: 'https://selenium-release.storage.googleapis.com',
        drivers: {
            chrome: {
                // check for more recent versions of chrome driver here:
                // http://chromedriver.storage.googleapis.com/index.html
                version: '2.22',
                arch: process.arch,
                baseURL: 'https://chromedriver.storage.googleapis.com'
            },
            ie: {
                // check for more recent versions of internet explorer driver here:
                // http://selenium-release.storage.googleapis.com/index.html
                version: '2.50.0',
                arch: 'ia32',
                baseURL: 'https://selenium-release.storage.googleapis.com'
            }
        }
    },*/

    // - - - - SESSION-MANAGER  - - - -
    noSessionReuse: false,

    // - - - - PHANTOM  - - - -
    phantom_w: 1280,
    phantom_h: 1024,

    // - - - - DEBUGGING  - - - -
    log: 'error',
    debug: false,
    seleniumDebug: null,
    debugCucumber: null,
    debugBrkCucumber: null,
    debugMocha: null,
    debugBrkMocha: null
};