import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeOperation } from 'app/shared/model/type-operation.model';
import { TypeOperationService } from './type-operation.service';

@Component({
    selector: 'jhi-type-operation-delete-dialog',
    templateUrl: './type-operation-delete-dialog.component.html'
})
export class TypeOperationDeleteDialogComponent {
    typeOperation: ITypeOperation;

    constructor(
        private typeOperationService: TypeOperationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.typeOperationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'typeOperationListModification',
                content: 'Deleted an typeOperation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-type-operation-delete-popup',
    template: ''
})
export class TypeOperationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ typeOperation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TypeOperationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.typeOperation = typeOperation;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
