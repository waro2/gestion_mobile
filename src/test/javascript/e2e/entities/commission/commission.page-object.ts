import { element, by, ElementFinder } from 'protractor';

export class CommissionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-commission div table .btn-danger'));
    title = element.all(by.css('jhi-commission div h2#page-heading span')).first();

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

export class CommissionUpdatePage {
    pageTitle = element(by.id('jhi-commission-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    montantminInput = element(by.id('field_montantmin'));
    montantmaxInput = element(by.id('field_montantmax'));
    commissionInput = element(by.id('field_commission'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setMontantminInput(montantmin) {
        await this.montantminInput.sendKeys(montantmin);
    }

    async getMontantminInput() {
        return this.montantminInput.getAttribute('value');
    }

    async setMontantmaxInput(montantmax) {
        await this.montantmaxInput.sendKeys(montantmax);
    }

    async getMontantmaxInput() {
        return this.montantmaxInput.getAttribute('value');
    }

    async setCommissionInput(commission) {
        await this.commissionInput.sendKeys(commission);
    }

    async getCommissionInput() {
        return this.commissionInput.getAttribute('value');
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

export class CommissionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-commission-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-commission'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
