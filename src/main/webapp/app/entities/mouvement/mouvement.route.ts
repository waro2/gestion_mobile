import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mouvement } from 'app/shared/model/mouvement.model';
import { MouvementService } from './mouvement.service';
import { MouvementComponent } from './mouvement.component';
import { MouvementDetailComponent } from './mouvement-detail.component';
import { MouvementUpdateComponent } from './mouvement-update.component';
import { MouvementDeletePopupComponent } from './mouvement-delete-dialog.component';
import { IMouvement } from 'app/shared/model/mouvement.model';

@Injectable({ providedIn: 'root' })
export class MouvementResolve implements Resolve<IMouvement> {
    constructor(private service: MouvementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Mouvement> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Mouvement>) => response.ok),
                map((mouvement: HttpResponse<Mouvement>) => mouvement.body)
            );
        }
        return of(new Mouvement());
    }
}

export const mouvementRoute: Routes = [
    {
        path: 'mouvement',
        component: MouvementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.mouvement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mouvement/:id/view',
        component: MouvementDetailComponent,
        resolve: {
            mouvement: MouvementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.mouvement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mouvement/new',
        component: MouvementUpdateComponent,
        resolve: {
            mouvement: MouvementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.mouvement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mouvement/:id/edit',
        component: MouvementUpdateComponent,
        resolve: {
            mouvement: MouvementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.mouvement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mouvementPopupRoute: Routes = [
    {
        path: 'mouvement/:id/delete',
        component: MouvementDeletePopupComponent,
        resolve: {
            mouvement: MouvementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.mouvement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
