import { element, by, ElementFinder } from 'protractor';

export class ClientComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-client div table .btn-danger'));
    title = element.all(by.css('jhi-client div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ClientUpdatePage {
    pageTitle = element(by.id('jhi-client-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    telephoneInput = element(by.id('field_telephone'));
    nomInput = element(by.id('field_nom'));
    prenomsInput = element(by.id('field_prenoms'));
    piecedidentiteInput = element(by.id('field_piecedidentite'));
    operateurSelect = element(by.id('field_operateur'));
    utilisateurSelect = element(by.id('field_utilisateur'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTelephoneInput(telephone) {
        await this.telephoneInput.sendKeys(telephone);
    }

    async getTelephoneInput() {
        return this.telephoneInput.getAttribute('value');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setPrenomsInput(prenoms) {
        await this.prenomsInput.sendKeys(prenoms);
    }

    async getPrenomsInput() {
        return this.prenomsInput.getAttribute('value');
    }

    async setPiecedidentiteInput(piecedidentite) {
        await this.piecedidentiteInput.sendKeys(piecedidentite);
    }

    async getPiecedidentiteInput() {
        return this.piecedidentiteInput.getAttribute('value');
    }

    async operateurSelectLastOption() {
        await this.operateurSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async operateurSelectOption(option) {
        await this.operateurSelect.sendKeys(option);
    }

    getOperateurSelect(): ElementFinder {
        return this.operateurSelect;
    }

    async getOperateurSelectedOption() {
        return this.operateurSelect.element(by.css('option:checked')).getText();
    }

    async utilisateurSelectLastOption() {
        await this.utilisateurSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async utilisateurSelectOption(option) {
        await this.utilisateurSelect.sendKeys(option);
    }

    getUtilisateurSelect(): ElementFinder {
        return this.utilisateurSelect;
    }

    async getUtilisateurSelectedOption() {
        return this.utilisateurSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class ClientDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-client-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-client'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
