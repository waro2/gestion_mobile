/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GroupeComponentsPage, GroupeDeleteDialog, GroupeUpdatePage } from './groupe.page-object';

const expect = chai.expect;

describe('Groupe e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let groupeUpdatePage: GroupeUpdatePage;
    let groupeComponentsPage: GroupeComponentsPage;
    let groupeDeleteDialog: GroupeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Groupes', async () => {
        await navBarPage.goToEntity('groupe');
        groupeComponentsPage = new GroupeComponentsPage();
        expect(await groupeComponentsPage.getTitle()).to.eq('gestionMobileApp.groupe.home.title');
    });

    it('should load create Groupe page', async () => {
        await groupeComponentsPage.clickOnCreateButton();
        groupeUpdatePage = new GroupeUpdatePage();
        expect(await groupeUpdatePage.getPageTitle()).to.eq('gestionMobileApp.groupe.home.createOrEditLabel');
        await groupeUpdatePage.cancel();
    });

    it('should create and save Groupes', async () => {
        const nbButtonsBeforeCreate = await groupeComponentsPage.countDeleteButtons();

        await groupeComponentsPage.clickOnCreateButton();
        await promise.all([
            groupeUpdatePage.setNomInput('nom'),
            groupeUpdatePage.setDescriptionInput('description'),
            groupeUpdatePage.groupeUserSelectLastOption()
        ]);
        expect(await groupeUpdatePage.getNomInput()).to.eq('nom');
        expect(await groupeUpdatePage.getDescriptionInput()).to.eq('description');
        await groupeUpdatePage.save();
        expect(await groupeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await groupeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Groupe', async () => {
        const nbButtonsBeforeDelete = await groupeComponentsPage.countDeleteButtons();
        await groupeComponentsPage.clickOnLastDeleteButton();

        groupeDeleteDialog = new GroupeDeleteDialog();
        expect(await groupeDeleteDialog.getDialogTitle()).to.eq('gestionMobileApp.groupe.delete.question');
        await groupeDeleteDialog.clickOnConfirmButton();

        expect(await groupeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
