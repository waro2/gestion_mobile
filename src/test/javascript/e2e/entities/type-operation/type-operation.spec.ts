/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TypeOperationComponentsPage, TypeOperationDeleteDialog, TypeOperationUpdatePage } from './type-operation.page-object';

const expect = chai.expect;

describe('TypeOperation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let typeOperationUpdatePage: TypeOperationUpdatePage;
    let typeOperationComponentsPage: TypeOperationComponentsPage;
    let typeOperationDeleteDialog: TypeOperationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TypeOperations', async () => {
        await navBarPage.goToEntity('type-operation');
        typeOperationComponentsPage = new TypeOperationComponentsPage();
        expect(await typeOperationComponentsPage.getTitle()).to.eq('gestionMobileApp.typeOperation.home.title');
    });

    it('should load create TypeOperation page', async () => {
        await typeOperationComponentsPage.clickOnCreateButton();
        typeOperationUpdatePage = new TypeOperationUpdatePage();
        expect(await typeOperationUpdatePage.getPageTitle()).to.eq('gestionMobileApp.typeOperation.home.createOrEditLabel');
        await typeOperationUpdatePage.cancel();
    });

    it('should create and save TypeOperations', async () => {
        const nbButtonsBeforeCreate = await typeOperationComponentsPage.countDeleteButtons();

        await typeOperationComponentsPage.clickOnCreateButton();
        await promise.all([
            typeOperationUpdatePage.setRetraitInput('retrait'),
            typeOperationUpdatePage.setDepotInput('depot'),
            typeOperationUpdatePage.setAchatcreditInput('achatcredit'),
            typeOperationUpdatePage.operationSelectLastOption()
        ]);
        expect(await typeOperationUpdatePage.getRetraitInput()).to.eq('retrait');
        expect(await typeOperationUpdatePage.getDepotInput()).to.eq('depot');
        expect(await typeOperationUpdatePage.getAchatcreditInput()).to.eq('achatcredit');
        await typeOperationUpdatePage.save();
        expect(await typeOperationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await typeOperationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TypeOperation', async () => {
        const nbButtonsBeforeDelete = await typeOperationComponentsPage.countDeleteButtons();
        await typeOperationComponentsPage.clickOnLastDeleteButton();

        typeOperationDeleteDialog = new TypeOperationDeleteDialog();
        expect(await typeOperationDeleteDialog.getDialogTitle()).to.eq('gestionMobileApp.typeOperation.delete.question');
        await typeOperationDeleteDialog.clickOnConfirmButton();

        expect(await typeOperationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
