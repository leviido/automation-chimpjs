
"use strict";

import {Page} from '../page'
//var expect = require('chai').expect;
import { expect } from 'chai';


const default_timeout = 60 * 1000;

class EditGeneDialog extends Page {
    constructor() {
        super();
    }

    /** getters **/

    get edit_gene_dialog() { return browser.element('.gene-editor-container'); }
    get gene_name() { return browser.element('.edit-name-preview'); }
    get edit_gene_btn() { return browser.element('button.edit-name-component-pencil')}




    navigate() {
    }


    rename_gene(old_name, name_name) {
        try {
            if (this.gene_name)
            var current_gene_name = this.gene_name.getText();
            expect(current_gene_name).to.be.equal(old_name);
            // rename the gene name
            this.edit_gene_btn.click();



            this.total_price_section.waitForVisible(default_timeout);
        } catch (err) {
            throw ("genes_drid.page::select_tube() - fail to select tube delivery format. \n" + err);
        }
    }
}

module.exports = new EditGeneDialog();
