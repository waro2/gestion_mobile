import { element, by, ElementFinder } from 'protractor';

export class UtilisateurComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-utilisateur div table .btn-danger'));
    title = element.all(by.css('jhi-utilisateur div h2#page-heading span')).first();

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

export class UtilisateurUpdatePage {
    pageTitle = element(by.id('jhi-utilisateur-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    loginInput = element(by.id('field_login'));
    nomInput = element(by.id('field_nom'));
    prenomsInput = element(by.id('field_prenoms'));
    motdepassInput = element(by.id('field_motdepass'));
    telephoneInput = element(by.id('field_telephone'));
    adresseInput = element(by.id('field_adresse'));
    operationSelect = element(by.id('field_operation'));
    groupeUserSelect = element(by.id('field_groupeUser'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setLoginInput(login) {
        await this.loginInput.sendKeys(login);
    }

    async getLoginInput() {
        return this.loginInput.getAttribute('value');
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

    async setMotdepassInput(motdepass) {
        await this.motdepassInput.sendKeys(motdepass);
    }

    async getMotdepassInput() {
        return this.motdepassInput.getAttribute('value');
    }

    async setTelephoneInput(telephone) {
        await this.telephoneInput.sendKeys(telephone);
    }

    async getTelephoneInput() {
        return this.telephoneInput.getAttribute('value');
    }

    async setAdresseInput(adresse) {
        await this.adresseInput.sendKeys(adresse);
    }

    async getAdresseInput() {
        return this.adresseInput.getAttribute('value');
    }

    async operationSelectLastOption() {
        await this.operationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async operationSelectOption(option) {
        await this.operationSelect.sendKeys(option);
    }

    getOperationSelect(): ElementFinder {
        return this.operationSelect;
    }

    async getOperationSelectedOption() {
        return this.operationSelect.element(by.css('option:checked')).getText();
    }

    async groupeUserSelectLastOption() {
        await this.groupeUserSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async groupeUserSelectOption(option) {
        await this.groupeUserSelect.sendKeys(option);
    }

    getGroupeUserSelect(): ElementFinder {
        return this.groupeUserSelect;
    }

    async getGroupeUserSelectedOption() {
        return this.groupeUserSelect.element(by.css('option:checked')).getText();
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

export class UtilisateurDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-utilisateur-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-utilisateur'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
