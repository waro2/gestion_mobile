import { element, by, ElementFinder } from 'protractor';

export class CompteComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-compte div table .btn-danger'));
    title = element.all(by.css('jhi-compte div h2#page-heading span')).first();

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

export class CompteUpdatePage {
    pageTitle = element(by.id('jhi-compte-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    numcompteInput = element(by.id('field_numcompte'));
    datecreationInput = element(by.id('field_datecreation'));
    datederniereoperationInput = element(by.id('field_datederniereoperation'));
    operateurSelect = element(by.id('field_operateur'));
    commissionSelect = element(by.id('field_commission'));
    mouvementSelect = element(by.id('field_mouvement'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNumcompteInput(numcompte) {
        await this.numcompteInput.sendKeys(numcompte);
    }

    async getNumcompteInput() {
        return this.numcompteInput.getAttribute('value');
    }

    async setDatecreationInput(datecreation) {
        await this.datecreationInput.sendKeys(datecreation);
    }

    async getDatecreationInput() {
        return this.datecreationInput.getAttribute('value');
    }

    async setDatederniereoperationInput(datederniereoperation) {
        await this.datederniereoperationInput.sendKeys(datederniereoperation);
    }

    async getDatederniereoperationInput() {
        return this.datederniereoperationInput.getAttribute('value');
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

    async commissionSelectLastOption() {
        await this.commissionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async commissionSelectOption(option) {
        await this.commissionSelect.sendKeys(option);
    }

    getCommissionSelect(): ElementFinder {
        return this.commissionSelect;
    }

    async getCommissionSelectedOption() {
        return this.commissionSelect.element(by.css('option:checked')).getText();
    }

    async mouvementSelectLastOption() {
        await this.mouvementSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async mouvementSelectOption(option) {
        await this.mouvementSelect.sendKeys(option);
    }

    getMouvementSelect(): ElementFinder {
        return this.mouvementSelect;
    }

    async getMouvementSelectedOption() {
        return this.mouvementSelect.element(by.css('option:checked')).getText();
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

export class CompteDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-compte-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-compte'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
