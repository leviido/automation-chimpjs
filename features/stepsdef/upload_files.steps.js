import * as World from '../support/world.js'

export default function () {

    this.When(/^upload file "([^"]*)"$/, function (file) {
        var fileFullPath = World.get_test_file_fullpath(file);
        try {
            // UploadFilePage.upload_file(file);
            browser.waitForEnabled('.icon-cloud-upload', 5000);
            browser.click('.icon-cloud-upload');

            browser.chooseFile('input[type="file"]', fileFullPath);
            browser.waitForEnabled('.sub-component-wizard-next-button', 60 * 1000);

            // click Continue button after upload is completed
            browser.click('.sub-component-wizard-next-button');

        } catch (err) {
            throw("upload_files.stpes::upload file() - failed to upload '" + fileFullPath +"'\n\r" + err);
        }
    });
}
