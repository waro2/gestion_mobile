import { Moment } from 'moment';
import { ICompte } from 'app/shared/model//compte.model';
import { IClient } from 'app/shared/model//client.model';

export interface IOperateur {
    id?: number;
    nom?: string;
    datecreation?: Moment;
    comptes?: ICompte[];
    clients?: IClient[];
}

export class Operateur implements IOperateur {
    constructor(
        public id?: number,
        public nom?: string,
        public datecreation?: Moment,
        public comptes?: ICompte[],
        public clients?: IClient[]
    ) {}
}
