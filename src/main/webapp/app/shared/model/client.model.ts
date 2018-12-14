import { IOperateur } from 'app/shared/model//operateur.model';
import { IUtilisateur } from 'app/shared/model//utilisateur.model';

export interface IClient {
    id?: number;
    telephone?: string;
    nom?: string;
    prenoms?: string;
    piecedidentite?: string;
    operateur?: IOperateur;
    utilisateur?: IUtilisateur;
}

export class Client implements IClient {
    constructor(
        public id?: number,
        public telephone?: string,
        public nom?: string,
        public prenoms?: string,
        public piecedidentite?: string,
        public operateur?: IOperateur,
        public utilisateur?: IUtilisateur
    ) {}
}
