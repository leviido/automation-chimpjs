var clearDatabase = function() {

    /*this.BeforeFeatures(() => {
        console.log("Test before hook!!")
        this.setDefaultTimeout(2000); // cucumber step timeout
    }*/

    this.Before({timeout: 60 * 1000}, function() {
       // this.setDefaultTimeout(2000); // cucumber step timeout
       //console.log("Test before hook")
    });

};

module.exports = clearDatabase;