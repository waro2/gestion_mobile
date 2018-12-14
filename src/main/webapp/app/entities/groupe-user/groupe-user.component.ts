import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGroupeUser } from 'app/shared/model/groupe-user.model';
import { Principal } from 'app/core';
import { GroupeUserService } from './groupe-user.service';

@Component({
    selector: 'jhi-groupe-user',
    templateUrl: './groupe-user.component.html'
})
export class GroupeUserComponent implements OnInit, OnDestroy {
    groupeUsers: IGroupeUser[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private groupeUserService: GroupeUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.groupeUserService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IGroupeUser[]>) => (this.groupeUsers = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.groupeUserService.query().subscribe(
            (res: HttpResponse<IGroupeUser[]>) => {
                this.groupeUsers = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGroupeUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGroupeUser) {
        return item.id;
    }

    registerChangeInGroupeUsers() {
        this.eventSubscriber = this.eventManager.subscribe('groupeUserListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
