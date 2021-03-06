/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionMobileTestModule } from '../../../test.module';
import { TypeOperationDeleteDialogComponent } from 'app/entities/type-operation/type-operation-delete-dialog.component';
import { TypeOperationService } from 'app/entities/type-operation/type-operation.service';

describe('Component Tests', () => {
    describe('TypeOperation Management Delete Component', () => {
        let comp: TypeOperationDeleteDialogComponent;
        let fixture: ComponentFixture<TypeOperationDeleteDialogComponent>;
        let service: TypeOperationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [TypeOperationDeleteDialogComponent]
            })
                .overrideTemplate(TypeOperationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypeOperationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeOperationService);
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
