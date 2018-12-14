import { ICompte } from 'app/shared/model//compte.model';

export interface ICommission {
    id?: number;
    montantmin?: number;
    montantmax?: number;
    commission?: number;
    comptes?: ICompte[];
}

export class Commission implements ICommission {
    constructor(
        public id?: number,
        public montantmin?: number,
        public montantmax?: number,
        public commission?: number,
        public comptes?: ICompte[]
    ) {}
}
