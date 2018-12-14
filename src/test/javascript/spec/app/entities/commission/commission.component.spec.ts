/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionMobileTestModule } from '../../../test.module';
import { CommissionComponent } from 'app/entities/commission/commission.component';
import { CommissionService } from 'app/entities/commission/commission.service';
import { Commission } from 'app/shared/model/commission.model';

describe('Component Tests', () => {
    describe('Commission Management Component', () => {
        let comp: CommissionComponent;
        let fixture: ComponentFixture<CommissionComponent>;
        let service: CommissionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [CommissionComponent],
                providers: []
            })
                .overrideTemplate(CommissionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CommissionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommissionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Commission(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.commissions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
