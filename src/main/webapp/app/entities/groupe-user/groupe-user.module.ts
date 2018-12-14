import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionMobileSharedModule } from 'app/shared';
import {
    GroupeUserComponent,
    GroupeUserDetailComponent,
    GroupeUserUpdateComponent,
    GroupeUserDeletePopupComponent,
    GroupeUserDeleteDialogComponent,
    groupeUserRoute,
    groupeUserPopupRoute
} from './';

const ENTITY_STATES = [...groupeUserRoute, ...groupeUserPopupRoute];

@NgModule({
    imports: [GestionMobileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GroupeUserComponent,
        GroupeUserDetailComponent,
        GroupeUserUpdateComponent,
        GroupeUserDeleteDialogComponent,
        GroupeUserDeletePopupComponent
    ],
    entryComponents: [GroupeUserComponent, GroupeUserUpdateComponent, GroupeUserDeleteDialogComponent, GroupeUserDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionMobileGroupeUserModule {}
