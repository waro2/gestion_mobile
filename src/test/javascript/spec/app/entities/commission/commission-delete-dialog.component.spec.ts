/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionMobileTestModule } from '../../../test.module';
import { CommissionDeleteDialogComponent } from 'app/entities/commission/commission-delete-dialog.component';
import { CommissionService } from 'app/entities/commission/commission.service';

describe('Component Tests', () => {
    describe('Commission Management Delete Component', () => {
        let comp: CommissionDeleteDialogComponent;
        let fixture: ComponentFixture<CommissionDeleteDialogComponent>;
        let service: CommissionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [CommissionDeleteDialogComponent]
            })
                .overrideTemplate(CommissionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CommissionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommissionService);
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
