import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GroupeUser } from 'app/shared/model/groupe-user.model';
import { GroupeUserService } from './groupe-user.service';
import { GroupeUserComponent } from './groupe-user.component';
import { GroupeUserDetailComponent } from './groupe-user-detail.component';
import { GroupeUserUpdateComponent } from './groupe-user-update.component';
import { GroupeUserDeletePopupComponent } from './groupe-user-delete-dialog.component';
import { IGroupeUser } from 'app/shared/model/groupe-user.model';

@Injectable({ providedIn: 'root' })
export class GroupeUserResolve implements Resolve<IGroupeUser> {
    constructor(private service: GroupeUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GroupeUser> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GroupeUser>) => response.ok),
                map((groupeUser: HttpResponse<GroupeUser>) => groupeUser.body)
            );
        }
        return of(new GroupeUser());
    }
}

export const groupeUserRoute: Routes = [
    {
        path: 'groupe-user',
        component: GroupeUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.groupeUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'groupe-user/:id/view',
        component: GroupeUserDetailComponent,
        resolve: {
            groupeUser: GroupeUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.groupeUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'groupe-user/new',
        component: GroupeUserUpdateComponent,
        resolve: {
            groupeUser: GroupeUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.groupeUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'groupe-user/:id/edit',
        component: GroupeUserUpdateComponent,
        resolve: {
            groupeUser: GroupeUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.groupeUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const groupeUserPopupRoute: Routes = [
    {
        path: 'groupe-user/:id/delete',
        component: GroupeUserDeletePopupComponent,
        resolve: {
            groupeUser: GroupeUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionMobileApp.groupeUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
