import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Utilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurComponent } from './utilisateur.component';
import { UtilisateurDetailComponent } from './utilisateur-detail.component';
import { UtilisateurUpdateComponent } from './utilisateur-update.component';
import { UtilisateurDeletePopupComponent } from './utilisateur-delete-dialog.component';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

@Injectable({ providedIn: 'root' })
export class UtilisateurResolve implements Resolve<IUtilisateur> {
    constructor(private service: UtilisateurService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Utilisateur> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Utilisateur>) => response.ok),
                map((utilisateur: HttpResponse<Utilisateur>) => utilisateur.body)
            );
        }
        return of(new Utilisateur());
    }
}

export const utilisateurRoute: Routes = [
    {
        path: 'utilisateur',
        component: UtilisateurComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'utilisateur/:id/view',
        component: UtilisateurDetailComponent,
        resolve: {
            utilisateur: UtilisateurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'utilisateur/new',
        component: UtilisateurUpdateComponent,
        resolve: {
            utilisateur: UtilisateurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'utilisateur/:id/edit',
        component: UtilisateurUpdateComponent,
        resolve: {
            utilisateur: UtilisateurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const utilisateurPopupRoute: Routes = [
    {
        path: 'utilisateur/:id/delete',
        component: UtilisateurDeletePopupComponent,
        resolve: {
            utilisateur: UtilisateurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
