/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionMobileTestModule } from '../../../test.module';
import { MouvementDeleteDialogComponent } from 'app/entities/mouvement/mouvement-delete-dialog.component';
import { MouvementService } from 'app/entities/mouvement/mouvement.service';

describe('Component Tests', () => {
    describe('Mouvement Management Delete Component', () => {
        let comp: MouvementDeleteDialogComponent;
        let fixture: ComponentFixture<MouvementDeleteDialogComponent>;
        let service: MouvementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [MouvementDeleteDialogComponent]
            })
                .overrideTemplate(MouvementDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MouvementDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MouvementService);
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
