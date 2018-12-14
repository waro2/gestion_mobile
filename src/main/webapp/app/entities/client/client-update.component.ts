import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IClient } from 'app/shared/model/client.model';
import { ClientService } from './client.service';
import { IOperateur } from 'app/shared/model/operateur.model';
import { OperateurService } from 'app/entities/operateur';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from 'app/entities/utilisateur';

@Component({
    selector: 'jhi-client-update',
    templateUrl: './client-update.component.html'
})
export class ClientUpdateComponent implements OnInit {
    client: IClient;
    isSaving: boolean;

    operateurs: IOperateur[];

    utilisateurs: IUtilisateur[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private clientService: ClientService,
        private operateurService: OperateurService,
        private utilisateurService: UtilisateurService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ client }) => {
            this.client = client;
        });
        this.operateurService.query().subscribe(
            (res: HttpResponse<IOperateur[]>) => {
                this.operateurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.utilisateurService.query().subscribe(
            (res: HttpResponse<IUtilisateur[]>) => {
                this.utilisateurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.client.id !== undefined) {
            this.subscribeToSaveResponse(this.clientService.update(this.client));
        } else {
            this.subscribeToSaveResponse(this.clientService.create(this.client));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>) {
        result.subscribe((res: HttpResponse<IClient>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOperateurById(index: number, item: IOperateur) {
        return item.id;
    }

    trackUtilisateurById(index: number, item: IUtilisateur) {
        return item.id;
    }
}
