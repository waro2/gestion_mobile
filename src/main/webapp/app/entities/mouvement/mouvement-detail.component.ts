import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMouvement } from 'app/shared/model/mouvement.model';

@Component({
    selector: 'jhi-mouvement-detail',
    templateUrl: './mouvement-detail.component.html'
})
export class MouvementDetailComponent implements OnInit {
    mouvement: IMouvement;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mouvement }) => {
            this.mouvement = mouvement;
        });
    }

    previousState() {
        window.history.back();
    }
}
