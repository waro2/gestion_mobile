import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionMobileSharedModule } from 'app/shared';
import {
    OperateurComponent,
    OperateurDetailComponent,
    OperateurUpdateComponent,
    OperateurDeletePopupComponent,
    OperateurDeleteDialogComponent,
    operateurRoute,
    operateurPopupRoute
} from './';

const ENTITY_STATES = [...operateurRoute, ...operateurPopupRoute];

@NgModule({
    imports: [GestionMobileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OperateurComponent,
        OperateurDetailComponent,
        OperateurUpdateComponent,
        OperateurDeleteDialogComponent,
        OperateurDeletePopupComponent
    ],
    entryComponents: [OperateurComponent, OperateurUpdateComponent, OperateurDeleteDialogComponent, OperateurDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionMobileOperateurModule {}
