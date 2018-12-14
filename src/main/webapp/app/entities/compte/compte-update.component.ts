import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICompte } from 'app/shared/model/compte.model';
import { CompteService } from './compte.service';
import { IOperateur } from 'app/shared/model/operateur.model';
import { OperateurService } from 'app/entities/operateur';
import { ICommission } from 'app/shared/model/commission.model';
import { CommissionService } from 'app/entities/commission';
import { IMouvement } from 'app/shared/model/mouvement.model';
import { MouvementService } from 'app/entities/mouvement';

@Component({
    selector: 'jhi-compte-update',
    templateUrl: './compte-update.component.html'
})
export class CompteUpdateComponent implements OnInit {
    compte: ICompte;
    isSaving: boolean;

    operateurs: IOperateur[];

    commissions: ICommission[];

    mouvements: IMouvement[];
    datecreation: string;
    datederniereoperationDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private compteService: CompteService,
        private operateurService: OperateurService,
        private commissionService: CommissionService,
        private mouvementService: MouvementService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ compte }) => {
            this.compte = compte;
            this.datecreation = this.compte.datecreation != null ? this.compte.datecreation.format(DATE_TIME_FORMAT) : null;
        });
        this.operateurService.query().subscribe(
            (res: HttpResponse<IOperateur[]>) => {
                this.operateurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.commissionService.query().subscribe(
            (res: HttpResponse<ICommission[]>) => {
                this.commissions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.mouvementService.query().subscribe(
            (res: HttpResponse<IMouvement[]>) => {
                this.mouvements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.compte.datecreation = this.datecreation != null ? moment(this.datecreation, DATE_TIME_FORMAT) : null;
        if (this.compte.id !== undefined) {
            this.subscribeToSaveResponse(this.compteService.update(this.compte));
        } else {
            this.subscribeToSaveResponse(this.compteService.create(this.compte));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompte>>) {
        result.subscribe((res: HttpResponse<ICompte>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCommissionById(index: number, item: ICommission) {
        return item.id;
    }

    trackMouvementById(index: number, item: IMouvement) {
        return item.id;
    }
}
