import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionMobileSharedModule } from 'app/shared';
import {
    MouvementComponent,
    MouvementDetailComponent,
    MouvementUpdateComponent,
    MouvementDeletePopupComponent,
    MouvementDeleteDialogComponent,
    mouvementRoute,
    mouvementPopupRoute
} from './';

const ENTITY_STATES = [...mouvementRoute, ...mouvementPopupRoute];

@NgModule({
    imports: [GestionMobileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MouvementComponent,
        MouvementDetailComponent,
        MouvementUpdateComponent,
        MouvementDeleteDialogComponent,
        MouvementDeletePopupComponent
    ],
    entryComponents: [MouvementComponent, MouvementUpdateComponent, MouvementDeleteDialogComponent, MouvementDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionMobileMouvementModule {}
