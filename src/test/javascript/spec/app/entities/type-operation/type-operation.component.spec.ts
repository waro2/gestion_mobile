/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionMobileTestModule } from '../../../test.module';
import { TypeOperationComponent } from 'app/entities/type-operation/type-operation.component';
import { TypeOperationService } from 'app/entities/type-operation/type-operation.service';
import { TypeOperation } from 'app/shared/model/type-operation.model';

describe('Component Tests', () => {
    describe('TypeOperation Management Component', () => {
        let comp: TypeOperationComponent;
        let fixture: ComponentFixture<TypeOperationComponent>;
        let service: TypeOperationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionMobileTestModule],
                declarations: [TypeOperationComponent],
                providers: []
            })
                .overrideTemplate(TypeOperationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypeOperationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeOperationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TypeOperation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.typeOperations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
