import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IOperateur } from 'app/shared/model/operateur.model';
import { OperateurService } from './operateur.service';

@Component({
    selector: 'jhi-operateur-update',
    templateUrl: './operateur-update.component.html'
})
export class OperateurUpdateComponent implements OnInit {
    operateur: IOperateur;
    isSaving: boolean;
    datecreationDp: any;

    constructor(private operateurService: OperateurService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ operateur }) => {
            this.operateur = operateur;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.operateur.id !== undefined) {
            this.subscribeToSaveResponse(this.operateurService.update(this.operateur));
        } else {
            this.subscribeToSaveResponse(this.operateurService.create(this.operateur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOperateur>>) {
        result.subscribe((res: HttpResponse<IOperateur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
