/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MouvementComponentsPage, MouvementDeleteDialog, MouvementUpdatePage } from './mouvement.page-object';

const expect = chai.expect;

describe('Mouvement e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mouvementUpdatePage: MouvementUpdatePage;
    let mouvementComponentsPage: MouvementComponentsPage;
    let mouvementDeleteDialog: MouvementDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Mouvements', async () => {
        await navBarPage.goToEntity('mouvement');
        mouvementComponentsPage = new MouvementComponentsPage();
        expect(await mouvementComponentsPage.getTitle()).to.eq('gestionMobileApp.mouvement.home.title');
    });

    it('should load create Mouvement page', async () => {
        await mouvementComponentsPage.clickOnCreateButton();
        mouvementUpdatePage = new MouvementUpdatePage();
        expect(await mouvementUpdatePage.getPageTitle()).to.eq('gestionMobileApp.mouvement.home.createOrEditLabel');
        await mouvementUpdatePage.cancel();
    });

    it('should create and save Mouvements', async () => {
        const nbButtonsBeforeCreate = await mouvementComponentsPage.countDeleteButtons();

        await mouvementComponentsPage.clickOnCreateButton();
        await promise.all([
            mouvementUpdatePage.setSensInput('sens'),
            mouvementUpdatePage.setReferenceInput('reference'),
            mouvementUpdatePage.setDateInput('2000-12-31'),
            mouvementUpdatePage.setMontantInput('5')
        ]);
        expect(await mouvementUpdatePage.getSensInput()).to.eq('sens');
        expect(await mouvementUpdatePage.getReferenceInput()).to.eq('reference');
        expect(await mouvementUpdatePage.getDateInput()).to.eq('2000-12-31');
        expect(await mouvementUpdatePage.getMontantInput()).to.eq('5');
        await mouvementUpdatePage.save();
        expect(await mouvementUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mouvementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Mouvement', async () => {
        const nbButtonsBeforeDelete = await mouvementComponentsPage.countDeleteButtons();
        await mouvementComponentsPage.clickOnLastDeleteButton();

        mouvementDeleteDialog = new MouvementDeleteDialog();
        expect(await mouvementDeleteDialog.getDialogTitle()).to.eq('gestionMobileApp.mouvement.delete.question');
        await mouvementDeleteDialog.clickOnConfirmButton();

        expect(await mouvementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
