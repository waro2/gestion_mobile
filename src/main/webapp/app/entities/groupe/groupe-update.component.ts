import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGroupe } from 'app/shared/model/groupe.model';
import { GroupeService } from './groupe.service';
import { IGroupeUser } from 'app/shared/model/groupe-user.model';
import { GroupeUserService } from 'app/entities/groupe-user';

@Component({
    selector: 'jhi-groupe-update',
    templateUrl: './groupe-update.component.html'
})
export class GroupeUpdateComponent implements OnInit {
    groupe: IGroupe;
    isSaving: boolean;

    groupeusers: IGroupeUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private groupeService: GroupeService,
        private groupeUserService: GroupeUserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ groupe }) => {
            this.groupe = groupe;
        });
        this.groupeUserService.query().subscribe(
            (res: HttpResponse<IGroupeUser[]>) => {
                this.groupeusers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.groupe.id !== undefined) {
            this.subscribeToSaveResponse(this.groupeService.update(this.groupe));
        } else {
            this.subscribeToSaveResponse(this.groupeService.create(this.groupe));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGroupe>>) {
        result.subscribe((res: HttpResponse<IGroupe>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGroupeUserById(index: number, item: IGroupeUser) {
        return item.id;
    }
}
