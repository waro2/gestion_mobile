/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionMobileTestModule } from '../../../test.module';
import { GroupeUserDeleteDialogComponent } from 'app/entities/groupe-user/groupe-user-delete-dialog.component';
import { GroupeUserService } from 'app/entities/groupe-user/groupe-user.service';

describe('Component Tests', () => {
    describe('GroupeUser Management Delete Component', () => {
        let comp: GroupeUserDeleteDialogComponent;
        let fixture: ComponentFixture<GroupeUserDeleteDialogComponent>;
        let service: GroupeUserService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [GroupeUserDeleteDialogComponent]
            })
                .overrideTemplate(GroupeUserDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GroupeUserDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupeUserService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
