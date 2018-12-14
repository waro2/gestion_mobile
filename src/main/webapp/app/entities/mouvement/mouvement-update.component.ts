import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IMouvement } from 'app/shared/model/mouvement.model';
import { MouvementService } from './mouvement.service';

@Component({
    selector: 'jhi-mouvement-update',
    templateUrl: './mouvement-update.component.html'
})
export class MouvementUpdateComponent implements OnInit {
    mouvement: IMouvement;
    isSaving: boolean;
    dateDp: any;

    constructor(private mouvementService: MouvementService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mouvement }) => {
            this.mouvement = mouvement;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mouvement.id !== undefined) {
            this.subscribeToSaveResponse(this.mouvementService.update(this.mouvement));
        } else {
            this.subscribeToSaveResponse(this.mouvementService.create(this.mouvement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMouvement>>) {
        result.subscribe((res: HttpResponse<IMouvement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
