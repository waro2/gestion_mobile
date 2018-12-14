import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMouvement } from 'app/shared/model/mouvement.model';

type EntityResponseType = HttpResponse<IMouvement>;
type EntityArrayResponseType = HttpResponse<IMouvement[]>;

@Injectable({ providedIn: 'root' })
export class MouvementService {
    public resourceUrl = SERVER_API_URL + 'api/mouvements';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/mouvements';

    constructor(private http: HttpClient) {}

    create(mouvement: IMouvement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(mouvement);
        return this.http
            .post<IMouvement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(mouvement: IMouvement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(mouvement);
        return this.http
            .put<IMouvement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMouvement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMouvement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMouvement[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(mouvement: IMouvement): IMouvement {
        const copy: IMouvement = Object.assign({}, mouvement, {
            date: mouvement.date != null && mouvement.date.isValid() ? mouvement.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((mouvement: IMouvement) => {
                mouvement.date = mouvement.date != null ? moment(mouvement.date) : null;
            });
        }
        return res;
    }
}
