/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CommissionComponentsPage, CommissionDeleteDialog, CommissionUpdatePage } from './commission.page-object';

const expect = chai.expect;

describe('Commission e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let commissionUpdatePage: CommissionUpdatePage;
    let commissionComponentsPage: CommissionComponentsPage;
    let commissionDeleteDialog: CommissionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Commissions', async () => {
        await navBarPage.goToEntity('commission');
        commissionComponentsPage = new CommissionComponentsPage();
        expect(await commissionComponentsPage.getTitle()).to.eq('gestionMobileApp.commission.home.title');
    });

    it('should load create Commission page', async () => {
        await commissionComponentsPage.clickOnCreateButton();
        commissionUpdatePage = new CommissionUpdatePage();
        expect(await commissionUpdatePage.getPageTitle()).to.eq('gestionMobileApp.commission.home.createOrEditLabel');
        await commissionUpdatePage.cancel();
    });

    it('should create and save Commissions', async () => {
        const nbButtonsBeforeCreate = await commissionComponentsPage.countDeleteButtons();

        await commissionComponentsPage.clickOnCreateButton();
        await promise.all([
            commissionUpdatePage.setMontantminInput('5'),
            commissionUpdatePage.setMontantmaxInput('5'),
            commissionUpdatePage.setCommissionInput('5')
        ]);
        expect(await commissionUpdatePage.getMontantminInput()).to.eq('5');
        expect(await commissionUpdatePage.getMontantmaxInput()).to.eq('5');
        expect(await commissionUpdatePage.getCommissionInput()).to.eq('5');
        await commissionUpdatePage.save();
        expect(await commissionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await commissionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Commission', async () => {
        const nbButtonsBeforeDelete = await commissionComponentsPage.countDeleteButtons();
        await commissionComponentsPage.clickOnLastDeleteButton();

        commissionDeleteDialog = new CommissionDeleteDialog();
        expect(await commissionDeleteDialog.getDialogTitle()).to.eq('gestionMobileApp.commission.delete.question');
        await commissionDeleteDialog.clickOnConfirmButton();

        expect(await commissionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
