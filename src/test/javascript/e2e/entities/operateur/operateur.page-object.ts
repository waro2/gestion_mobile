import { element, by, ElementFinder } from 'protractor';

export class OperateurComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-operateur div table .btn-danger'));
    title = element.all(by.css('jhi-operateur div h2#page-heading span')).first();

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

export class OperateurUpdatePage {
    pageTitle = element(by.id('jhi-operateur-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    datecreationInput = element(by.id('field_datecreation'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setDatecreationInput(datecreation) {
        await this.datecreationInput.sendKeys(datecreation);
    }

    async getDatecreationInput() {
        return this.datecreationInput.getAttribute('value');
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

export class OperateurDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-operateur-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-operateur'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
