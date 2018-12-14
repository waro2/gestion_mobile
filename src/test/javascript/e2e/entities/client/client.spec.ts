/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ClientComponentsPage, ClientDeleteDialog, ClientUpdatePage } from './client.page-object';

const expect = chai.expect;

describe('Client e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let clientUpdatePage: ClientUpdatePage;
    let clientComponentsPage: ClientComponentsPage;
    let clientDeleteDialog: ClientDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Clients', async () => {
        await navBarPage.goToEntity('client');
        clientComponentsPage = new ClientComponentsPage();
        expect(await clientComponentsPage.getTitle()).to.eq('gestionMobileApp.client.home.title');
    });

    it('should load create Client page', async () => {
        await clientComponentsPage.clickOnCreateButton();
        clientUpdatePage = new ClientUpdatePage();
        expect(await clientUpdatePage.getPageTitle()).to.eq('gestionMobileApp.client.home.createOrEditLabel');
        await clientUpdatePage.cancel();
    });

    it('should create and save Clients', async () => {
        const nbButtonsBeforeCreate = await clientComponentsPage.countDeleteButtons();

        await clientComponentsPage.clickOnCreateButton();
        await promise.all([
            clientUpdatePage.setTelephoneInput('telephone'),
            clientUpdatePage.setNomInput('nom'),
            clientUpdatePage.setPrenomsInput('prenoms'),
            clientUpdatePage.setPiecedidentiteInput('piecedidentite'),
            clientUpdatePage.operateurSelectLastOption(),
            clientUpdatePage.utilisateurSelectLastOption()
        ]);
        expect(await clientUpdatePage.getTelephoneInput()).to.eq('telephone');
        expect(await clientUpdatePage.getNomInput()).to.eq('nom');
        expect(await clientUpdatePage.getPrenomsInput()).to.eq('prenoms');
        expect(await clientUpdatePage.getPiecedidentiteInput()).to.eq('piecedidentite');
        await clientUpdatePage.save();
        expect(await clientUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await clientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Client', async () => {
        const nbButtonsBeforeDelete = await clientComponentsPage.countDeleteButtons();
        await clientComponentsPage.clickOnLastDeleteButton();

        clientDeleteDialog = new ClientDeleteDialog();
        expect(await clientDeleteDialog.getDialogTitle()).to.eq('gestionMobileApp.client.delete.question');
        await clientDeleteDialog.clickOnConfirmButton();

        expect(await clientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
