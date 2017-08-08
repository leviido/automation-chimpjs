"use strict";

//const Page = require('./page')

import {Page} from './page'

class UploadFilePage extends Page {
    constructor() {
        super();
    }

    get upload_file_btn()  { return browser.element('.icon-cloud-upload'); }
    get file_input() { return browser.element('input[type="file"]'); }
    get continue_btn() { return browser.element('.sub-component-wizard-next-button'); }

    navigate() {
        // need here a navigate code to the Home page
        // super.open('hhttps://ecommerce.twistbioscience-staging.com/app');
    }

    upload_file(file) {
        this.navigate();

        /*browser.
        waitForEnabled(this.upload_file_btn(), 5000)
            .click(this.upload_file_btn())
            .chooseFile(this.file_input(), file)
            .waitForEnabled(this.continue_btn, 30000)
            .click(this.continue_btn);*/
    }
}

module.exports = new UploadFilePage();
