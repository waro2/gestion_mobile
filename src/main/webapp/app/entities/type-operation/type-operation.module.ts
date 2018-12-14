import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionMobileSharedModule } from 'app/shared';
import {
    TypeOperationComponent,
    TypeOperationDetailComponent,
    TypeOperationUpdateComponent,
    TypeOperationDeletePopupComponent,
    TypeOperationDeleteDialogComponent,
    typeOperationRoute,
    typeOperationPopupRoute
} from './';

const ENTITY_STATES = [...typeOperationRoute, ...typeOperationPopupRoute];

@NgModule({
    imports: [GestionMobileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TypeOperationComponent,
        TypeOperationDetailComponent,
        TypeOperationUpdateComponent,
        TypeOperationDeleteDialogComponent,
        TypeOperationDeletePopupComponent
    ],
    entryComponents: [
        TypeOperationComponent,
        TypeOperationUpdateComponent,
        TypeOperationDeleteDialogComponent,
        TypeOperationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionMobileTypeOperationModule {}
