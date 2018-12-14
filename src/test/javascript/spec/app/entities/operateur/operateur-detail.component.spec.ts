/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionMobileTestModule } from '../../../test.module';
import { OperateurDetailComponent } from 'app/entities/operateur/operateur-detail.component';
import { Operateur } from 'app/shared/model/operateur.model';

describe('Component Tests', () => {
    describe('Operateur Management Detail Component', () => {
        let comp: OperateurDetailComponent;
        let fixture: ComponentFixture<OperateurDetailComponent>;
        const route = ({ data: of({ operateur: new Operateur(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [OperateurDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OperateurDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OperateurDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.operateur).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
