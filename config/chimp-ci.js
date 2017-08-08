
var chimp = require('gulp-chimp');
var gulp = require('gulp');

/* Chimp.js - Automated/e2e Testing with a config file */
gulp.task('chimp', function () {
    return chimp('chimp.conf.js');
});


