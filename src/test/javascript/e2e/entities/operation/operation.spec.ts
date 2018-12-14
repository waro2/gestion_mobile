/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OperationComponentsPage, OperationDeleteDialog, OperationUpdatePage } from './operation.page-object';

const expect = chai.expect;

describe('Operation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let operationUpdatePage: OperationUpdatePage;
    let operationComponentsPage: OperationComponentsPage;
    let operationDeleteDialog: OperationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Operations', async () => {
        await navBarPage.goToEntity('operation');
        operationComponentsPage = new OperationComponentsPage();
        expect(await operationComponentsPage.getTitle()).to.eq('gestionMobileApp.operation.home.title');
    });

    it('should load create Operation page', async () => {
        await operationComponentsPage.clickOnCreateButton();
        operationUpdatePage = new OperationUpdatePage();
        expect(await operationUpdatePage.getPageTitle()).to.eq('gestionMobileApp.operation.home.createOrEditLabel');
        await operationUpdatePage.cancel();
    });

    it('should create and save Operations', async () => {
        const nbButtonsBeforeCreate = await operationComponentsPage.countDeleteButtons();

        await operationComponentsPage.clickOnCreateButton();
        await promise.all([
            operationUpdatePage.setMontantInput('5'),
            operationUpdatePage.setFraiscommissionInput('5'),
            operationUpdatePage.setDateoperationsInput('2000-12-31')
        ]);
        expect(await operationUpdatePage.getMontantInput()).to.eq('5');
        expect(await operationUpdatePage.getFraiscommissionInput()).to.eq('5');
        expect(await operationUpdatePage.getDateoperationsInput()).to.eq('2000-12-31');
        await operationUpdatePage.save();
        expect(await operationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await operationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Operation', async () => {
        const nbButtonsBeforeDelete = await operationComponentsPage.countDeleteButtons();
        await operationComponentsPage.clickOnLastDeleteButton();

        operationDeleteDialog = new OperationDeleteDialog();
        expect(await operationDeleteDialog.getDialogTitle()).to.eq('gestionMobileApp.operation.delete.question');
        await operationDeleteDialog.clickOnConfirmButton();

        expect(await operationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
