import { IOperation } from 'app/shared/model//operation.model';
import { IClient } from 'app/shared/model//client.model';
import { IGroupeUser } from 'app/shared/model//groupe-user.model';

export interface IUtilisateur {
    id?: number;
    login?: string;
    nom?: string;
    prenoms?: string;
    motdepass?: string;
    telephone?: string;
    adresse?: string;
    operation?: IOperation;
    clients?: IClient[];
    groupeUser?: IGroupeUser;
}

export class Utilisateur implements IUtilisateur {
    constructor(
        public id?: number,
        public login?: string,
        public nom?: string,
        public prenoms?: string,
        public motdepass?: string,
        public telephone?: string,
        public adresse?: string,
        public operation?: IOperation,
        public clients?: IClient[],
        public groupeUser?: IGroupeUser
    ) {}
}
