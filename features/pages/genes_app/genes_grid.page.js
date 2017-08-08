
"use strict";

import {Page} from '../page'


const default_timeout = 60 * 1000;

class GenesGridPage extends Page {
    constructor() {
        super();
    }

    /** getters **/

    get quote_btn() { return browser.element('#add-to-cart-btn'); }
    get quote_confirm_dlg() { return browser.element('.add-to-cart-successful-container'); }
    get quote_confirm_ok_btn() { return browser.element('.notification-modal button'); }
    get tube_radio_button() { return browser.element('label[for^=shipping-method-tube]'); }
    get total_price_section() { return browser.element('#total-price-section'); }
    get the_total_price() { return browser.element('#total-price-section label:nth-of-type(2) '); }
    get sequence_cell() { return "//*[contains(text(), 'GENE_NAME')]/../following-sibling::div[1]"; }
    get edit_gene_dialog() { return browser.element('.gene-editor-container'); }


    navigate() {
    }


    select_tube() {
        try {
            this.tube_radio_button.click();
            this.total_price_section.waitForVisible(default_timeout);
        } catch (err) {
            throw ("genes_drid.page::select_tube() - fail to select tube delivery format. \n" + err);
        }
    }

    click_a_gene(gene_name) {
        var pattern = /GENE_NAME/ig;
        this.sequence_cell.replace(pattern, gene_name);
        console.log("this.sequence_cell.replace= " + this.sequence_cell.replace);
        browser.click(this.sequence_cell);
        this.edit_gene_dialog.waitForExist(5000);
    }

    /**
     * waiting for a specific total price
     * @param expected_price
     * @param timeout
     */
    wait_for_total_price(timeout, expected_price) {
        try {
            this.total_price_section.waitForExist(timeout);
        } catch (err) {
            throw ("genes_drid.page::wait_for_total_price() - total price still not shown after " + timeout + "ms");
        }

        if (typeof expected_price !== "undefined") {

            // verify the actual price is as expected
            var actual_price = undefined;
            try {
                actual_price = this.the_total_price.getText();
                expect(actual_price).toBe(expected_price);
            } catch (err) {
                throw ("genes_drid.page::wait_for_total_price(expected_price) - the total price is different than expected.\n" +
                "Expected " + expected_price + ", but got " + actual_price);
            }
        }
    }

    /**
     * Waits aand clicks the quote button
     * @param timeout
     */
    ask_for_a_quote(timeout) {
        try {
            // assure that the 'Ask a Quote" button is enable
            this.quote_btn.waitForEnabled(timeout);

            this.quote_btn.click();
            this.quote_confirm_dlg.waitForEnabled(10 * 1000);
            this.quote_confirm_ok_btn.click();
        } catch (err) {
            throw ("genes_drid.page::ask_for_a_quote() - failed to ask for a quote.\n" + err);
        }
    }
}

module.exports = new GenesGridPage();
