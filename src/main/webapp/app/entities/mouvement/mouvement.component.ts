import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMouvement } from 'app/shared/model/mouvement.model';
import { Principal } from 'app/core';
import { MouvementService } from './mouvement.service';

@Component({
    selector: 'jhi-mouvement',
    templateUrl: './mouvement.component.html'
})
export class MouvementComponent implements OnInit, OnDestroy {
    mouvements: IMouvement[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private mouvementService: MouvementService,
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
            this.mouvementService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IMouvement[]>) => (this.mouvements = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.mouvementService.query().subscribe(
            (res: HttpResponse<IMouvement[]>) => {
                this.mouvements = res.body;
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
        this.registerChangeInMouvements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMouvement) {
        return item.id;
    }

    registerChangeInMouvements() {
        this.eventSubscriber = this.eventManager.subscribe('mouvementListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
