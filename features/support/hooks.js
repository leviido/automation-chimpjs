module.exports = function () {
    this.Before(function(scenario) {
        console.log('---------- Starting Scenario [' + scenario.getName().toUpperCase() + '] ----------');
        console.log("profile=" + process.env['chimp.profile'] + " | " + process.env.profile + " | " + process.argv[10]);
    });

    this.After(function(scenario) {
        console.log('---------- End Scenario [' + scenario.getName().toUpperCase() + '] ----------');
    });

    /* ---- custom command ---- */

    /*browser.addCommand("getUrlAndTitle", function (customVar) {
        return {
            url: this.getUrl(),
            title: this.getTitle(),
            customVar: customVar
        };
    });*/
}