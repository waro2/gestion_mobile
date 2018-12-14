import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICommission } from 'app/shared/model/commission.model';
import { CommissionService } from './commission.service';

@Component({
    selector: 'jhi-commission-update',
    templateUrl: './commission-update.component.html'
})
export class CommissionUpdateComponent implements OnInit {
    commission: ICommission;
    isSaving: boolean;

    constructor(private commissionService: CommissionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ commission }) => {
            this.commission = commission;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.commission.id !== undefined) {
            this.subscribeToSaveResponse(this.commissionService.update(this.commission));
        } else {
            this.subscribeToSaveResponse(this.commissionService.create(this.commission));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICommission>>) {
        result.subscribe((res: HttpResponse<ICommission>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
