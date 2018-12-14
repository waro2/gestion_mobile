/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionMobileTestModule } from '../../../test.module';
import { GroupeUserUpdateComponent } from 'app/entities/groupe-user/groupe-user-update.component';
import { GroupeUserService } from 'app/entities/groupe-user/groupe-user.service';
import { GroupeUser } from 'app/shared/model/groupe-user.model';

describe('Component Tests', () => {
    describe('GroupeUser Management Update Component', () => {
        let comp: GroupeUserUpdateComponent;
        let fixture: ComponentFixture<GroupeUserUpdateComponent>;
        let service: GroupeUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [GroupeUserUpdateComponent]
            })
                .overrideTemplate(GroupeUserUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GroupeUserUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupeUserService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GroupeUser(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.groupeUser = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GroupeUser();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.groupeUser = entity;
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
