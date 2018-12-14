import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITypeOperation } from 'app/shared/model/type-operation.model';

type EntityResponseType = HttpResponse<ITypeOperation>;
type EntityArrayResponseType = HttpResponse<ITypeOperation[]>;

@Injectable({ providedIn: 'root' })
export class TypeOperationService {
    public resourceUrl = SERVER_API_URL + 'api/type-operations';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/type-operations';

    constructor(private http: HttpClient) {}

    create(typeOperation: ITypeOperation): Observable<EntityResponseType> {
        return this.http.post<ITypeOperation>(this.resourceUrl, typeOperation, { observe: 'response' });
    }

    update(typeOperation: ITypeOperation): Observable<EntityResponseType> {
        return this.http.put<ITypeOperation>(this.resourceUrl, typeOperation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITypeOperation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITypeOperation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITypeOperation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
