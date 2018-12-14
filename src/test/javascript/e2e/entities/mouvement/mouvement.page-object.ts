import { element, by, ElementFinder } from 'protractor';

export class MouvementComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-mouvement div table .btn-danger'));
    title = element.all(by.css('jhi-mouvement div h2#page-heading span')).first();

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

export class MouvementUpdatePage {
    pageTitle = element(by.id('jhi-mouvement-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    sensInput = element(by.id('field_sens'));
    referenceInput = element(by.id('field_reference'));
    dateInput = element(by.id('field_date'));
    montantInput = element(by.id('field_montant'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setSensInput(sens) {
        await this.sensInput.sendKeys(sens);
    }

    async getSensInput() {
        return this.sensInput.getAttribute('value');
    }

    async setReferenceInput(reference) {
        await this.referenceInput.sendKeys(reference);
    }

    async getReferenceInput() {
        return this.referenceInput.getAttribute('value');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async setMontantInput(montant) {
        await this.montantInput.sendKeys(montant);
    }

    async getMontantInput() {
        return this.montantInput.getAttribute('value');
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

export class MouvementDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-mouvement-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-mouvement'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
