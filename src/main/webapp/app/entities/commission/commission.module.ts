import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionMobileSharedModule } from 'app/shared';
import {
    CommissionComponent,
    CommissionDetailComponent,
    CommissionUpdateComponent,
    CommissionDeletePopupComponent,
    CommissionDeleteDialogComponent,
    commissionRoute,
    commissionPopupRoute
} from './';

const ENTITY_STATES = [...commissionRoute, ...commissionPopupRoute];

@NgModule({
    imports: [GestionMobileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CommissionComponent,
        CommissionDetailComponent,
        CommissionUpdateComponent,
        CommissionDeleteDialogComponent,
        CommissionDeletePopupComponent
    ],
    entryComponents: [CommissionComponent, CommissionUpdateComponent, CommissionDeleteDialogComponent, CommissionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionMobileCommissionModule {}
