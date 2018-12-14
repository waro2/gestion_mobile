import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICommission } from 'app/shared/model/commission.model';

type EntityResponseType = HttpResponse<ICommission>;
type EntityArrayResponseType = HttpResponse<ICommission[]>;

@Injectable({ providedIn: 'root' })
export class CommissionService {
    public resourceUrl = SERVER_API_URL + 'api/commissions';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/commissions';

    constructor(private http: HttpClient) {}

    create(commission: ICommission): Observable<EntityResponseType> {
        return this.http.post<ICommission>(this.resourceUrl, commission, { observe: 'response' });
    }

    update(commission: ICommission): Observable<EntityResponseType> {
        return this.http.put<ICommission>(this.resourceUrl, commission, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICommission>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICommission[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICommission[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
