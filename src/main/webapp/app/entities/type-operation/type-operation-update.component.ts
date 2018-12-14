import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITypeOperation } from 'app/shared/model/type-operation.model';
import { TypeOperationService } from './type-operation.service';
import { IOperation } from 'app/shared/model/operation.model';
import { OperationService } from 'app/entities/operation';

@Component({
    selector: 'jhi-type-operation-update',
    templateUrl: './type-operation-update.component.html'
})
export class TypeOperationUpdateComponent implements OnInit {
    typeOperation: ITypeOperation;
    isSaving: boolean;

    operations: IOperation[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private typeOperationService: TypeOperationService,
        private operationService: OperationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ typeOperation }) => {
            this.typeOperation = typeOperation;
        });
        this.operationService.query().subscribe(
            (res: HttpResponse<IOperation[]>) => {
                this.operations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.typeOperation.id !== undefined) {
            this.subscribeToSaveResponse(this.typeOperationService.update(this.typeOperation));
        } else {
            this.subscribeToSaveResponse(this.typeOperationService.create(this.typeOperation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITypeOperation>>) {
        result.subscribe((res: HttpResponse<ITypeOperation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackOperationById(index: number, item: IOperation) {
        return item.id;
    }
}
