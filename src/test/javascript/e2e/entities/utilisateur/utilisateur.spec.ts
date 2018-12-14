/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UtilisateurComponentsPage, UtilisateurDeleteDialog, UtilisateurUpdatePage } from './utilisateur.page-object';

const expect = chai.expect;

describe('Utilisateur e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let utilisateurUpdatePage: UtilisateurUpdatePage;
    let utilisateurComponentsPage: UtilisateurComponentsPage;
    let utilisateurDeleteDialog: UtilisateurDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Utilisateurs', async () => {
        await navBarPage.goToEntity('utilisateur');
        utilisateurComponentsPage = new UtilisateurComponentsPage();
        expect(await utilisateurComponentsPage.getTitle()).to.eq('gestionMobileApp.utilisateur.home.title');
    });

    it('should load create Utilisateur page', async () => {
        await utilisateurComponentsPage.clickOnCreateButton();
        utilisateurUpdatePage = new UtilisateurUpdatePage();
        expect(await utilisateurUpdatePage.getPageTitle()).to.eq('gestionMobileApp.utilisateur.home.createOrEditLabel');
        await utilisateurUpdatePage.cancel();
    });

    it('should create and save Utilisateurs', async () => {
        const nbButtonsBeforeCreate = await utilisateurComponentsPage.countDeleteButtons();

        await utilisateurComponentsPage.clickOnCreateButton();
        await promise.all([
            utilisateurUpdatePage.setLoginInput('login'),
            utilisateurUpdatePage.setNomInput('nom'),
            utilisateurUpdatePage.setPrenomsInput('prenoms'),
            utilisateurUpdatePage.setMotdepassInput('motdepass'),
            utilisateurUpdatePage.setTelephoneInput('telephone'),
            utilisateurUpdatePage.setAdresseInput('adresse'),
            utilisateurUpdatePage.operationSelectLastOption(),
            utilisateurUpdatePage.groupeUserSelectLastOption()
        ]);
        expect(await utilisateurUpdatePage.getLoginInput()).to.eq('login');
        expect(await utilisateurUpdatePage.getNomInput()).to.eq('nom');
        expect(await utilisateurUpdatePage.getPrenomsInput()).to.eq('prenoms');
        expect(await utilisateurUpdatePage.getMotdepassInput()).to.eq('motdepass');
        expect(await utilisateurUpdatePage.getTelephoneInput()).to.eq('telephone');
        expect(await utilisateurUpdatePage.getAdresseInput()).to.eq('adresse');
        await utilisateurUpdatePage.save();
        expect(await utilisateurUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await utilisateurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Utilisateur', async () => {
        const nbButtonsBeforeDelete = await utilisateurComponentsPage.countDeleteButtons();
        await utilisateurComponentsPage.clickOnLastDeleteButton();

        utilisateurDeleteDialog = new UtilisateurDeleteDialog();
        expect(await utilisateurDeleteDialog.getDialogTitle()).to.eq('gestionMobileApp.utilisateur.delete.question');
        await utilisateurDeleteDialog.clickOnConfirmButton();

        expect(await utilisateurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
