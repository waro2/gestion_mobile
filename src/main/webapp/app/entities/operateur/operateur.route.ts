import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Operateur } from 'app/shared/model/operateur.model';
import { OperateurService } from './operateur.service';
import { OperateurComponent } from './operateur.component';
import { OperateurDetailComponent } from './operateur-detail.component';
import { OperateurUpdateComponent } from './operateur-update.component';
import { OperateurDeletePopupComponent } from './operateur-delete-dialog.component';
import { IOperateur } from 'app/shared/model/operateur.model';

@Injectable({ providedIn: 'root' })
export class OperateurResolve implements Resolve<IOperateur> {
    constructor(private service: OperateurService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Operateur> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Operateur>) => response.ok),
                map((operateur: HttpResponse<Operateur>) => operateur.body)
            );
        }
        return of(new Operateur());
    }
}

export const operateurRoute: Routes = [
    {
        path: 'operateur',
        component: OperateurComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.operateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'operateur/:id/view',
        component: OperateurDetailComponent,
        resolve: {
            operateur: OperateurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.operateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'operateur/new',
        component: OperateurUpdateComponent,
        resolve: {
            operateur: OperateurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.operateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'operateur/:id/edit',
        component: OperateurUpdateComponent,
        resolve: {
            operateur: OperateurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.operateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const operateurPopupRoute: Routes = [
    {
        path: 'operateur/:id/delete',
        component: OperateurDeletePopupComponent,
        resolve: {
            operateur: OperateurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.operateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
