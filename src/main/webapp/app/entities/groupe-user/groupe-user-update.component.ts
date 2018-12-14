import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IGroupeUser } from 'app/shared/model/groupe-user.model';
import { GroupeUserService } from './groupe-user.service';

@Component({
    selector: 'jhi-groupe-user-update',
    templateUrl: './groupe-user-update.component.html'
})
export class GroupeUserUpdateComponent implements OnInit {
    groupeUser: IGroupeUser;
    isSaving: boolean;
    dateDp: any;

    constructor(private groupeUserService: GroupeUserService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ groupeUser }) => {
            this.groupeUser = groupeUser;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.groupeUser.id !== undefined) {
            this.subscribeToSaveResponse(this.groupeUserService.update(this.groupeUser));
        } else {
            this.subscribeToSaveResponse(this.groupeUserService.create(this.groupeUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGroupeUser>>) {
        result.subscribe((res: HttpResponse<IGroupeUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
