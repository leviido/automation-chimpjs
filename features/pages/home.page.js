"use strict";

import {Page} from './page'
import * as World from '../support/world.js'

 class HomePage extends Page {
    constructor() {
        super();
    }

  //  this.World = require(process.cwd() + '/features/support/world').World;

    get twist_logo() { return browser.element('.header-t-logo'); } // TODO consider place this element in another place
    get home_btn() { return browser.element('//a[text()="Home"]'); }
    get genes_frag_card()  { return browser.element('div.gene-app .twist-app-button-card-front'); }
    get oligo_pools_card()  { return browser.element('div.oligo-app .twist-app-button-card-front'); }
    get project_name_input() {return browser.element('input.input-component'); }
    get start_new_proj_gene_app_btn()  { return browser.element('.gene-app .twist-app-button-create-draft'); }
    get start_new_proj_oligo_pool_btn()  { return browser.element('.oligo-app .twist-app-button-create-draft'); }
    get gene_app_container_flipped()  {return browser.element('.gene-app.twist-app-button-container-flipped'); }
    get oligo_app_container_flipped()  {return browser.element('.oligo-app.twist-app-button-container-flipped'); }
    get project_name_label() { return browser.element('label.edit-name-preview'); }
    get continue_btn() { return browser.element('button.sub-component-wizard-next-button'); }
    get logout_btn() { return browser.element('.header-dropdown-content > a[href$=sign_out]'); }

    navigate() {
        // TODO should we check if the Home button exist?? what about if we are logged in?
        if (this.twist_logo.isVisible()) {
            this.twist_logo.click();
        } else {
            this.home_btn.waitForEnabled(5000);
            this.home_btn.click();
        }
    }

    logOut() {
        this.logout_btn.click();
    }

    isLoggedIn  = function() {
        return browser.isExisting('.header-dropdown-content') // > a[href$=sign_out]');
    }

    create_new_project(appType, project_name) {
        this.navigate();
        let app = World.appType[appType]
        try {
            switch (app) {
                case World.appType.GENES_FRAG: {
                    this.gene_app_container_flipped.waitForExist(1000, true);
                    this.gene_app_container_flipped.waitForVisible(1000, true);
                    this.genes_frag_card.waitForEnabled(1000);
                    this.genes_frag_card.click();
                    this.gene_app_container_flipped.waitForExist(1000);
                    this.gene_app_container_flipped.waitForVisible(1000);
                    this.start_new_proj_gene_app_btn.waitForEnabled(500);
                    browser.pause(500)
                    if (typeof project_name !== 'undefined') {
                        this.project_name_input.setValue(project_name);
                    }
                    this.start_new_proj_gene_app_btn.click();
                    break;
                }
                case World.appType.OLIGO_POOLS: {
                    this.oligo_app_container_flipped.waitForExist(1000, true);
                    this.oligo_app_container_flipped.waitForVisible(1000, true);
                    this.oligo_pools_card.waitForEnabled(2000);
                    this.oligo_pools_card.click();
                    this.oligo_app_container_flipped.waitForExist(1000, false);
                    this.oligo_app_container_flipped.waitForVisible(1000, false);
                    this.start_new_proj_oligo_pool_btn.waitForEnabled(500);
                    browser.pause(500)
                    if (typeof project_name !== 'undefined') {
                        this.project_name_input.setValue(project_name);
                    }
                    this.start_new_proj_oligo_pool_btn.click();
                    break;
                }
                default: {
                    throw ("Home.page::create_new_project() - wrong application type, should be any of: " + World.appType);
                }
            }
        } catch (err) {
            throw ("Home.Page::create_new_project() - failed to create a new draft (project). " + err);
        }

        // checking that the name of the created project equal to the given name
        if (typeof project_name !== 'undefined') {
            var actual_project_name = this.project_name_label.getText();
            var expected_project_name = project_name.toString();
            try {
                expect(actual_project_name).toBe(expected_project_name);
            } catch (err) {
                throw ("Home.page::create_new_project() - the project has a different name than expected.\n" +
                "Expected " + expected_project_name + ", but got " + actual_project_name);
            }
        }

        // waiting for the Continue button to be clickable (== waiting for the spinner to disappear)
        try {
            browser.waitUntil(function () {
                return browser.isExisting('.app-loading-component-container') === false
            }, 8 * 1000, 'expected spinner to be gone after 8s');
            this.continue_btn.click()
        } catch (err) {
            console.log(err);
            // try once more after sleeping of 2sec
            browser.pause(2000);
            this.continue_btn.click();
        }
    }
}

module.exports = new HomePage();
