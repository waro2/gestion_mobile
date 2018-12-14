/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionMobileTestModule } from '../../../test.module';
import { GroupeUserComponent } from 'app/entities/groupe-user/groupe-user.component';
import { GroupeUserService } from 'app/entities/groupe-user/groupe-user.service';
import { GroupeUser } from 'app/shared/model/groupe-user.model';

describe('Component Tests', () => {
    describe('GroupeUser Management Component', () => {
        let comp: GroupeUserComponent;
        let fixture: ComponentFixture<GroupeUserComponent>;
        let service: GroupeUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [GroupeUserComponent],
                providers: []
            })
                .overrideTemplate(GroupeUserComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GroupeUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupeUserService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GroupeUser(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.groupeUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
