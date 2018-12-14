import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GestionMobileCompteModule } from './compte/compte.module';
import { GestionMobileOperateurModule } from './operateur/operateur.module';
import { GestionMobileOperationModule } from './operation/operation.module';
import { GestionMobileTypeOperationModule } from './type-operation/type-operation.module';
import { GestionMobileUtilisateurModule } from './utilisateur/utilisateur.module';
import { GestionMobileClientModule } from './client/client.module';
import { GestionMobileGroupeModule } from './groupe/groupe.module';
import { GestionMobileGroupeUserModule } from './groupe-user/groupe-user.module';
import { GestionMobileCommissionModule } from './commission/commission.module';
import { GestionMobileMouvementModule } from './mouvement/mouvement.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GestionMobileCompteModule,
        GestionMobileOperateurModule,
        GestionMobileOperationModule,
        GestionMobileTypeOperationModule,
        GestionMobileUtilisateurModule,
        GestionMobileClientModule,
        GestionMobileGroupeModule,
        GestionMobileGroupeUserModule,
        GestionMobileCommissionModule,
        GestionMobileMouvementModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionMobileEntityModule {}
