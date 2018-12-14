import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeOperation } from 'app/shared/model/type-operation.model';

@Component({
    selector: 'jhi-type-operation-detail',
    templateUrl: './type-operation-detail.component.html'
})
export class TypeOperationDetailComponent implements OnInit {
    typeOperation: ITypeOperation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ typeOperation }) => {
            this.typeOperation = typeOperation;
        });
    }

    previousState() {
        window.history.back();
    }
}
