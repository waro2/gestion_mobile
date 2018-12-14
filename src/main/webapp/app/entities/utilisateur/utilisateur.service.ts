import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

type EntityResponseType = HttpResponse<IUtilisateur>;
type EntityArrayResponseType = HttpResponse<IUtilisateur[]>;

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
    public resourceUrl = SERVER_API_URL + 'api/utilisateurs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/utilisateurs';

    constructor(private http: HttpClient) {}

    create(utilisateur: IUtilisateur): Observable<EntityResponseType> {
        return this.http.post<IUtilisateur>(this.resourceUrl, utilisateur, { observe: 'response' });
    }

    update(utilisateur: IUtilisateur): Observable<EntityResponseType> {
        return this.http.put<IUtilisateur>(this.resourceUrl, utilisateur, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUtilisateur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUtilisateur[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUtilisateur[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
