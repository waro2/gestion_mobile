import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGroupeUser } from 'app/shared/model/groupe-user.model';
import { GroupeUserService } from './groupe-user.service';

@Component({
    selector: 'jhi-groupe-user-delete-dialog',
    templateUrl: './groupe-user-delete-dialog.component.html'
})
export class GroupeUserDeleteDialogComponent {
    groupeUser: IGroupeUser;

    constructor(private groupeUserService: GroupeUserService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.groupeUserService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'groupeUserListModification',
                content: 'Deleted an groupeUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-groupe-user-delete-popup',
    template: ''
})
export class GroupeUserDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ groupeUser }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GroupeUserDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.groupeUser = groupeUser;
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
