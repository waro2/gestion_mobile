import { element, by, ElementFinder } from 'protractor';

export class OperationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-operation div table .btn-danger'));
    title = element.all(by.css('jhi-operation div h2#page-heading span')).first();

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

export class OperationUpdatePage {
    pageTitle = element(by.id('jhi-operation-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    montantInput = element(by.id('field_montant'));
    fraiscommissionInput = element(by.id('field_fraiscommission'));
    dateoperationsInput = element(by.id('field_dateoperations'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setMontantInput(montant) {
        await this.montantInput.sendKeys(montant);
    }

    async getMontantInput() {
        return this.montantInput.getAttribute('value');
    }

    async setFraiscommissionInput(fraiscommission) {
        await this.fraiscommissionInput.sendKeys(fraiscommission);
    }

    async getFraiscommissionInput() {
        return this.fraiscommissionInput.getAttribute('value');
    }

    async setDateoperationsInput(dateoperations) {
        await this.dateoperationsInput.sendKeys(dateoperations);
    }

    async getDateoperationsInput() {
        return this.dateoperationsInput.getAttribute('value');
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

export class OperationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-operation-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-operation'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
