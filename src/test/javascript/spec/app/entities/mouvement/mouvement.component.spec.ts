/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionMobileTestModule } from '../../../test.module';
import { MouvementComponent } from 'app/entities/mouvement/mouvement.component';
import { MouvementService } from 'app/entities/mouvement/mouvement.service';
import { Mouvement } from 'app/shared/model/mouvement.model';

describe('Component Tests', () => {
    describe('Mouvement Management Component', () => {
        let comp: MouvementComponent;
        let fixture: ComponentFixture<MouvementComponent>;
        let service: MouvementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [MouvementComponent],
                providers: []
            })
                .overrideTemplate(MouvementComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MouvementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MouvementService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Mouvement(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mouvements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
