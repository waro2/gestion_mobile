import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGroupeUser } from 'app/shared/model/groupe-user.model';

type EntityResponseType = HttpResponse<IGroupeUser>;
type EntityArrayResponseType = HttpResponse<IGroupeUser[]>;

@Injectable({ providedIn: 'root' })
export class GroupeUserService {
    public resourceUrl = SERVER_API_URL + 'api/groupe-users';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/groupe-users';

    constructor(private http: HttpClient) {}

    create(groupeUser: IGroupeUser): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(groupeUser);
        return this.http
            .post<IGroupeUser>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(groupeUser: IGroupeUser): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(groupeUser);
        return this.http
            .put<IGroupeUser>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGroupeUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGroupeUser[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGroupeUser[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(groupeUser: IGroupeUser): IGroupeUser {
        const copy: IGroupeUser = Object.assign({}, groupeUser, {
            date: groupeUser.date != null && groupeUser.date.isValid() ? groupeUser.date.format(DATE_FORMAT) : null
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
            res.body.forEach((groupeUser: IGroupeUser) => {
                groupeUser.date = groupeUser.date != null ? moment(groupeUser.date) : null;
            });
        }
        return res;
    }
}
