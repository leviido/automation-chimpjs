/*
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({registerHandler}) {
    registerHandler('AfterFeatures', function (features, callback) {
        // clean up!
        // There is no World instance available on `this`
        // because all scenarios are done and World instances are long gone.
        console.log("AFTER FEATURES EVENT")
        callback();
    });

    registerHandler('ScenarioResult', function (scenarioResult, callback) {
        // clean up!
        // There is no World instance available on `this`
        // because all scenarios are done and World instances are long gone.
        console.log("SCENARIO RESULT ==> " + scenarioResult.STATUS_CODES.toString())
        callback();
    });

});*/
