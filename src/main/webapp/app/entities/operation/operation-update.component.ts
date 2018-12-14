import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IOperation } from 'app/shared/model/operation.model';
import { OperationService } from './operation.service';

@Component({
    selector: 'jhi-operation-update',
    templateUrl: './operation-update.component.html'
})
export class OperationUpdateComponent implements OnInit {
    operation: IOperation;
    isSaving: boolean;
    dateoperationsDp: any;

    constructor(private operationService: OperationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ operation }) => {
            this.operation = operation;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.operation.id !== undefined) {
            this.subscribeToSaveResponse(this.operationService.update(this.operation));
        } else {
            this.subscribeToSaveResponse(this.operationService.create(this.operation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOperation>>) {
        result.subscribe((res: HttpResponse<IOperation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
