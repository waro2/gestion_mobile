import { element, by, ElementFinder } from 'protractor';

export class GroupeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-groupe div table .btn-danger'));
    title = element.all(by.css('jhi-groupe div h2#page-heading span')).first();

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

export class GroupeUpdatePage {
    pageTitle = element(by.id('jhi-groupe-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    descriptionInput = element(by.id('field_description'));
    groupeUserSelect = element(by.id('field_groupeUser'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
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

export class GroupeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-groupe-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-groupe'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
