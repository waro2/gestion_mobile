/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionMobileTestModule } from '../../../test.module';
import { OperateurDeleteDialogComponent } from 'app/entities/operateur/operateur-delete-dialog.component';
import { OperateurService } from 'app/entities/operateur/operateur.service';

describe('Component Tests', () => {
    describe('Operateur Management Delete Component', () => {
        let comp: OperateurDeleteDialogComponent;
        let fixture: ComponentFixture<OperateurDeleteDialogComponent>;
        let service: OperateurService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [OperateurDeleteDialogComponent]
            })
                .overrideTemplate(OperateurDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OperateurDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperateurService);
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
