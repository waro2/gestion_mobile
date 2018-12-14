/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionMobileTestModule } from '../../../test.module';
import { UtilisateurDetailComponent } from 'app/entities/utilisateur/utilisateur-detail.component';
import { Utilisateur } from 'app/shared/model/utilisateur.model';

describe('Component Tests', () => {
    describe('Utilisateur Management Detail Component', () => {
        let comp: UtilisateurDetailComponent;
        let fixture: ComponentFixture<UtilisateurDetailComponent>;
        const route = ({ data: of({ utilisateur: new Utilisateur(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [UtilisateurDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UtilisateurDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UtilisateurDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.utilisateur).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
