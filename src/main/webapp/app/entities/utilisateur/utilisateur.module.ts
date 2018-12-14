import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionMobileSharedModule } from 'app/shared';
import {
    UtilisateurComponent,
    UtilisateurDetailComponent,
    UtilisateurUpdateComponent,
    UtilisateurDeletePopupComponent,
    UtilisateurDeleteDialogComponent,
    utilisateurRoute,
    utilisateurPopupRoute
} from './';

const ENTITY_STATES = [...utilisateurRoute, ...utilisateurPopupRoute];

@NgModule({
    imports: [GestionMobileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UtilisateurComponent,
        UtilisateurDetailComponent,
        UtilisateurUpdateComponent,
        UtilisateurDeleteDialogComponent,
        UtilisateurDeletePopupComponent
    ],
    entryComponents: [UtilisateurComponent, UtilisateurUpdateComponent, UtilisateurDeleteDialogComponent, UtilisateurDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionMobileUtilisateurModule {}
