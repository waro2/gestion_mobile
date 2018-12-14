import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUtilisateur } from 'app/shared/model/utilisateur.model';

@Component({
    selector: 'jhi-utilisateur-detail',
    templateUrl: './utilisateur-detail.component.html'
})
export class UtilisateurDetailComponent implements OnInit {
    utilisateur: IUtilisateur;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ utilisateur }) => {
            this.utilisateur = utilisateur;
        });
    }

    previousState() {
        window.history.back();
    }
}
