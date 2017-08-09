module.exports = function () {
    this.Before(function(scenario) {
      //  console.log('---------- Starting Scenario [' + scenario.getName().toUpperCase() + '] ----------');
    });

    this.After(function(scenario) {
       // console.log('---------- End Scenario [' + scenario.getName().toUpperCase() + '] ----------');
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