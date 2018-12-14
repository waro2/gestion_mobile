import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOperateur } from 'app/shared/model/operateur.model';

@Component({
    selector: 'jhi-operateur-detail',
    templateUrl: './operateur-detail.component.html'
})
export class OperateurDetailComponent implements OnInit {
    operateur: IOperateur;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ operateur }) => {
            this.operateur = operateur;
        });
    }

    previousState() {
        window.history.back();
    }
}
