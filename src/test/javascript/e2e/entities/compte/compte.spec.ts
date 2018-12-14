/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CompteComponentsPage, CompteDeleteDialog, CompteUpdatePage } from './compte.page-object';

const expect = chai.expect;

describe('Compte e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let compteUpdatePage: CompteUpdatePage;
    let compteComponentsPage: CompteComponentsPage;
    let compteDeleteDialog: CompteDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Comptes', async () => {
        await navBarPage.goToEntity('compte');
        compteComponentsPage = new CompteComponentsPage();
        expect(await compteComponentsPage.getTitle()).to.eq('gestionMobileApp.compte.home.title');
    });

    it('should load create Compte page', async () => {
        await compteComponentsPage.clickOnCreateButton();
        compteUpdatePage = new CompteUpdatePage();
        expect(await compteUpdatePage.getPageTitle()).to.eq('gestionMobileApp.compte.home.createOrEditLabel');
        await compteUpdatePage.cancel();
    });

    it('should create and save Comptes', async () => {
        const nbButtonsBeforeCreate = await compteComponentsPage.countDeleteButtons();

        await compteComponentsPage.clickOnCreateButton();
        await promise.all([
            compteUpdatePage.setNumcompteInput('numcompte'),
            compteUpdatePage.setDatecreationInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            compteUpdatePage.setDatederniereoperationInput('2000-12-31'),
            compteUpdatePage.operateurSelectLastOption(),
            compteUpdatePage.commissionSelectLastOption(),
            compteUpdatePage.mouvementSelectLastOption()
        ]);
        expect(await compteUpdatePage.getNumcompteInput()).to.eq('numcompte');
        expect(await compteUpdatePage.getDatecreationInput()).to.contain('2001-01-01T02:30');
        expect(await compteUpdatePage.getDatederniereoperationInput()).to.eq('2000-12-31');
        await compteUpdatePage.save();
        expect(await compteUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await compteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Compte', async () => {
        const nbButtonsBeforeDelete = await compteComponentsPage.countDeleteButtons();
        await compteComponentsPage.clickOnLastDeleteButton();

        compteDeleteDialog = new CompteDeleteDialog();
        expect(await compteDeleteDialog.getDialogTitle()).to.eq('gestionMobileApp.compte.delete.question');
        await compteDeleteDialog.clickOnConfirmButton();

        expect(await compteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
