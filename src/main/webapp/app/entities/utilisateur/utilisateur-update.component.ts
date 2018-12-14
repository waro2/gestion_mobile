import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';
import { IOperation } from 'app/shared/model/operation.model';
import { OperationService } from 'app/entities/operation';
import { IGroupeUser } from 'app/shared/model/groupe-user.model';
import { GroupeUserService } from 'app/entities/groupe-user';

@Component({
    selector: 'jhi-utilisateur-update',
    templateUrl: './utilisateur-update.component.html'
})
export class UtilisateurUpdateComponent implements OnInit {
    utilisateur: IUtilisateur;
    isSaving: boolean;

    operations: IOperation[];

    groupeusers: IGroupeUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private utilisateurService: UtilisateurService,
        private operationService: OperationService,
        private groupeUserService: GroupeUserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ utilisateur }) => {
            this.utilisateur = utilisateur;
        });
        this.operationService.query().subscribe(
            (res: HttpResponse<IOperation[]>) => {
                this.operations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.utilisateur.id !== undefined) {
            this.subscribeToSaveResponse(this.utilisateurService.update(this.utilisateur));
        } else {
            this.subscribeToSaveResponse(this.utilisateurService.create(this.utilisateur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUtilisateur>>) {
        result.subscribe((res: HttpResponse<IUtilisateur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGroupeUserById(index: number, item: IGroupeUser) {
        return item.id;
    }
}
