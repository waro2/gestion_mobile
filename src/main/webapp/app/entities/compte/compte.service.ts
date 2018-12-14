import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompte } from 'app/shared/model/compte.model';

type EntityResponseType = HttpResponse<ICompte>;
type EntityArrayResponseType = HttpResponse<ICompte[]>;

@Injectable({ providedIn: 'root' })
export class CompteService {
    public resourceUrl = SERVER_API_URL + 'api/comptes';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/comptes';

    constructor(private http: HttpClient) {}

    create(compte: ICompte): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(compte);
        return this.http
            .post<ICompte>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(compte: ICompte): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(compte);
        return this.http
            .put<ICompte>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICompte>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICompte[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICompte[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(compte: ICompte): ICompte {
        const copy: ICompte = Object.assign({}, compte, {
            datecreation: compte.datecreation != null && compte.datecreation.isValid() ? compte.datecreation.toJSON() : null,
            datederniereoperation:
                compte.datederniereoperation != null && compte.datederniereoperation.isValid()
                    ? compte.datederniereoperation.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.datecreation = res.body.datecreation != null ? moment(res.body.datecreation) : null;
            res.body.datederniereoperation = res.body.datederniereoperation != null ? moment(res.body.datederniereoperation) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((compte: ICompte) => {
                compte.datecreation = compte.datecreation != null ? moment(compte.datecreation) : null;
                compte.datederniereoperation = compte.datederniereoperation != null ? moment(compte.datederniereoperation) : null;
            });
        }
        return res;
    }
}
