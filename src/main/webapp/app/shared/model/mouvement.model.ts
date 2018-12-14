import { Moment } from 'moment';
import { ICompte } from 'app/shared/model//compte.model';

export interface IMouvement {
    id?: number;
    sens?: string;
    reference?: string;
    date?: Moment;
    montant?: number;
    comptes?: ICompte[];
}

export class Mouvement implements IMouvement {
    constructor(
        public id?: number,
        public sens?: string,
        public reference?: string,
        public date?: Moment,
        public montant?: number,
        public comptes?: ICompte[]
    ) {}
}
