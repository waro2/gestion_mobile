/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionMobileTestModule } from '../../../test.module';
import { OperateurUpdateComponent } from 'app/entities/operateur/operateur-update.component';
import { OperateurService } from 'app/entities/operateur/operateur.service';
import { Operateur } from 'app/shared/model/operateur.model';

describe('Component Tests', () => {
    describe('Operateur Management Update Component', () => {
        let comp: OperateurUpdateComponent;
        let fixture: ComponentFixture<OperateurUpdateComponent>;
        let service: OperateurService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [OperateurUpdateComponent]
            })
                .overrideTemplate(OperateurUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OperateurUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperateurService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Operateur(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.operateur = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Operateur();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.operateur = entity;
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
