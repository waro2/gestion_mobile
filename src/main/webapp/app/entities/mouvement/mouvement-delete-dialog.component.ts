import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMouvement } from 'app/shared/model/mouvement.model';
import { MouvementService } from './mouvement.service';

@Component({
    selector: 'jhi-mouvement-delete-dialog',
    templateUrl: './mouvement-delete-dialog.component.html'
})
export class MouvementDeleteDialogComponent {
    mouvement: IMouvement;

    constructor(private mouvementService: MouvementService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mouvementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mouvementListModification',
                content: 'Deleted an mouvement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mouvement-delete-popup',
    template: ''
})
export class MouvementDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mouvement }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MouvementDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.mouvement = mouvement;
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
