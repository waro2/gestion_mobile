/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionMobileTestModule } from '../../../test.module';
import { TypeOperationUpdateComponent } from 'app/entities/type-operation/type-operation-update.component';
import { TypeOperationService } from 'app/entities/type-operation/type-operation.service';
import { TypeOperation } from 'app/shared/model/type-operation.model';

describe('Component Tests', () => {
    describe('TypeOperation Management Update Component', () => {
        let comp: TypeOperationUpdateComponent;
        let fixture: ComponentFixture<TypeOperationUpdateComponent>;
        let service: TypeOperationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [TypeOperationUpdateComponent]
            })
                .overrideTemplate(TypeOperationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypeOperationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeOperationService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TypeOperation(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.typeOperation = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TypeOperation();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.typeOperation = entity;
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
