/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionMobileTestModule } from '../../../test.module';
import { CommissionUpdateComponent } from 'app/entities/commission/commission-update.component';
import { CommissionService } from 'app/entities/commission/commission.service';
import { Commission } from 'app/shared/model/commission.model';

describe('Component Tests', () => {
    describe('Commission Management Update Component', () => {
        let comp: CommissionUpdateComponent;
        let fixture: ComponentFixture<CommissionUpdateComponent>;
        let service: CommissionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [CommissionUpdateComponent]
            })
                .overrideTemplate(CommissionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CommissionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommissionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Commission(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.commission = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Commission();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.commission = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
