/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GroupeUserComponentsPage, GroupeUserDeleteDialog, GroupeUserUpdatePage } from './groupe-user.page-object';

const expect = chai.expect;

describe('GroupeUser e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let groupeUserUpdatePage: GroupeUserUpdatePage;
    let groupeUserComponentsPage: GroupeUserComponentsPage;
    let groupeUserDeleteDialog: GroupeUserDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GroupeUsers', async () => {
        await navBarPage.goToEntity('groupe-user');
        groupeUserComponentsPage = new GroupeUserComponentsPage();
        expect(await groupeUserComponentsPage.getTitle()).to.eq('gestionMobileApp.groupeUser.home.title');
    });

    it('should load create GroupeUser page', async () => {
        await groupeUserComponentsPage.clickOnCreateButton();
        groupeUserUpdatePage = new GroupeUserUpdatePage();
        expect(await groupeUserUpdatePage.getPageTitle()).to.eq('gestionMobileApp.groupeUser.home.createOrEditLabel');
        await groupeUserUpdatePage.cancel();
    });

    it('should create and save GroupeUsers', async () => {
        const nbButtonsBeforeCreate = await groupeUserComponentsPage.countDeleteButtons();

        await groupeUserComponentsPage.clickOnCreateButton();
        await promise.all([
            groupeUserUpdatePage.setGroupeutilisateurInput('groupeutilisateur'),
            groupeUserUpdatePage.setDateInput('2000-12-31')
        ]);
        expect(await groupeUserUpdatePage.getGroupeutilisateurInput()).to.eq('groupeutilisateur');
        expect(await groupeUserUpdatePage.getDateInput()).to.eq('2000-12-31');
        await groupeUserUpdatePage.save();
        expect(await groupeUserUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await groupeUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GroupeUser', async () => {
        const nbButtonsBeforeDelete = await groupeUserComponentsPage.countDeleteButtons();
        await groupeUserComponentsPage.clickOnLastDeleteButton();

        groupeUserDeleteDialog = new GroupeUserDeleteDialog();
        expect(await groupeUserDeleteDialog.getDialogTitle()).to.eq('gestionMobileApp.groupeUser.delete.question');
        await groupeUserDeleteDialog.clickOnConfirmButton();

        expect(await groupeUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
