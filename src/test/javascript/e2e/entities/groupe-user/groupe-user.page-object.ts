import { element, by, ElementFinder } from 'protractor';

export class GroupeUserComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-groupe-user div table .btn-danger'));
    title = element.all(by.css('jhi-groupe-user div h2#page-heading span')).first();

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

export class GroupeUserUpdatePage {
    pageTitle = element(by.id('jhi-groupe-user-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    groupeutilisateurInput = element(by.id('field_groupeutilisateur'));
    dateInput = element(by.id('field_date'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setGroupeutilisateurInput(groupeutilisateur) {
        await this.groupeutilisateurInput.sendKeys(groupeutilisateur);
    }

    async getGroupeutilisateurInput() {
        return this.groupeutilisateurInput.getAttribute('value');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
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

export class GroupeUserDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-groupeUser-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-groupeUser'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
