import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGroupeUser } from 'app/shared/model/groupe-user.model';

@Component({
    selector: 'jhi-groupe-user-detail',
    templateUrl: './groupe-user-detail.component.html'
})
export class GroupeUserDetailComponent implements OnInit {
    groupeUser: IGroupeUser;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ groupeUser }) => {
            this.groupeUser = groupeUser;
        });
    }

    previousState() {
        window.history.back();
    }
}
