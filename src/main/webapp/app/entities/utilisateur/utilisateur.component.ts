import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { Principal } from 'app/core';
import { UtilisateurService } from './utilisateur.service';

@Component({
    selector: 'jhi-utilisateur',
    templateUrl: './utilisateur.component.html'
})
export class UtilisateurComponent implements OnInit, OnDestroy {
    utilisateurs: IUtilisateur[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private utilisateurService: UtilisateurService,
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
            this.utilisateurService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IUtilisateur[]>) => (this.utilisateurs = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.utilisateurService.query().subscribe(
            (res: HttpResponse<IUtilisateur[]>) => {
                this.utilisateurs = res.body;
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
        this.registerChangeInUtilisateurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUtilisateur) {
        return item.id;
    }

    registerChangeInUtilisateurs() {
        this.eventSubscriber = this.eventManager.subscribe('utilisateurListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
