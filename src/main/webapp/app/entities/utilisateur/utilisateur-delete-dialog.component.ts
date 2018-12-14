import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';

@Component({
    selector: 'jhi-utilisateur-delete-dialog',
    templateUrl: './utilisateur-delete-dialog.component.html'
})
export class UtilisateurDeleteDialogComponent {
    utilisateur: IUtilisateur;

    constructor(
        private utilisateurService: UtilisateurService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.utilisateurService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'utilisateurListModification',
                content: 'Deleted an utilisateur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-utilisateur-delete-popup',
    template: ''
})
export class UtilisateurDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ utilisateur }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UtilisateurDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.utilisateur = utilisateur;
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
