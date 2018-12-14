import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TypeOperation } from 'app/shared/model/type-operation.model';
import { TypeOperationService } from './type-operation.service';
import { TypeOperationComponent } from './type-operation.component';
import { TypeOperationDetailComponent } from './type-operation-detail.component';
import { TypeOperationUpdateComponent } from './type-operation-update.component';
import { TypeOperationDeletePopupComponent } from './type-operation-delete-dialog.component';
import { ITypeOperation } from 'app/shared/model/type-operation.model';

@Injectable({ providedIn: 'root' })
export class TypeOperationResolve implements Resolve<ITypeOperation> {
    constructor(private service: TypeOperationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TypeOperation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TypeOperation>) => response.ok),
                map((typeOperation: HttpResponse<TypeOperation>) => typeOperation.body)
            );
        }
        return of(new TypeOperation());
    }
}

export const typeOperationRoute: Routes = [
    {
        path: 'type-operation',
        component: TypeOperationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.typeOperation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'type-operation/:id/view',
        component: TypeOperationDetailComponent,
        resolve: {
            typeOperation: TypeOperationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.typeOperation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'type-operation/new',
        component: TypeOperationUpdateComponent,
        resolve: {
            typeOperation: TypeOperationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.typeOperation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'type-operation/:id/edit',
        component: TypeOperationUpdateComponent,
        resolve: {
            typeOperation: TypeOperationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.typeOperation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const typeOperationPopupRoute: Routes = [
    {
        path: 'type-operation/:id/delete',
        component: TypeOperationDeletePopupComponent,
        resolve: {
            typeOperation: TypeOperationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.typeOperation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
