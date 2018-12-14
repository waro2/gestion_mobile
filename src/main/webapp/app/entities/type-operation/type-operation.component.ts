import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITypeOperation } from 'app/shared/model/type-operation.model';
import { Principal } from 'app/core';
import { TypeOperationService } from './type-operation.service';

@Component({
    selector: 'jhi-type-operation',
    templateUrl: './type-operation.component.html'
})
export class TypeOperationComponent implements OnInit, OnDestroy {
    typeOperations: ITypeOperation[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private typeOperationService: TypeOperationService,
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
            this.typeOperationService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITypeOperation[]>) => (this.typeOperations = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.typeOperationService.query().subscribe(
            (res: HttpResponse<ITypeOperation[]>) => {
                this.typeOperations = res.body;
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
        this.registerChangeInTypeOperations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITypeOperation) {
        return item.id;
    }

    registerChangeInTypeOperations() {
        this.eventSubscriber = this.eventManager.subscribe('typeOperationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
