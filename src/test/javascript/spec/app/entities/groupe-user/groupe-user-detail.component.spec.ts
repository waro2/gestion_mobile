/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionMobileTestModule } from '../../../test.module';
import { GroupeUserDetailComponent } from 'app/entities/groupe-user/groupe-user-detail.component';
import { GroupeUser } from 'app/shared/model/groupe-user.model';

describe('Component Tests', () => {
    describe('GroupeUser Management Detail Component', () => {
        let comp: GroupeUserDetailComponent;
        let fixture: ComponentFixture<GroupeUserDetailComponent>;
        const route = ({ data: of({ groupeUser: new GroupeUser(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [GroupeUserDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GroupeUserDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GroupeUserDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.groupeUser).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
