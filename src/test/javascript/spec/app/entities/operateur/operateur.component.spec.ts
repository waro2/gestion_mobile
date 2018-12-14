/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionMobileTestModule } from '../../../test.module';
import { OperateurComponent } from 'app/entities/operateur/operateur.component';
import { OperateurService } from 'app/entities/operateur/operateur.service';
import { Operateur } from 'app/shared/model/operateur.model';

describe('Component Tests', () => {
    describe('Operateur Management Component', () => {
        let comp: OperateurComponent;
        let fixture: ComponentFixture<OperateurComponent>;
        let service: OperateurService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [OperateurComponent],
                providers: []
            })
                .overrideTemplate(OperateurComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OperateurComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperateurService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Operateur(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.operateurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
