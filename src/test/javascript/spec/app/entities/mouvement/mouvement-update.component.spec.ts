/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionMobileTestModule } from '../../../test.module';
import { MouvementUpdateComponent } from 'app/entities/mouvement/mouvement-update.component';
import { MouvementService } from 'app/entities/mouvement/mouvement.service';
import { Mouvement } from 'app/shared/model/mouvement.model';

describe('Component Tests', () => {
    describe('Mouvement Management Update Component', () => {
        let comp: MouvementUpdateComponent;
        let fixture: ComponentFixture<MouvementUpdateComponent>;
        let service: MouvementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [MouvementUpdateComponent]
            })
                .overrideTemplate(MouvementUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MouvementUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MouvementService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Mouvement(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.mouvement = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Mouvement();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.mouvement = entity;
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
