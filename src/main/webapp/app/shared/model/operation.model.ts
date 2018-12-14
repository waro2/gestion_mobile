import { Moment } from 'moment';
import { IUtilisateur } from 'app/shared/model//utilisateur.model';
import { ITypeOperation } from 'app/shared/model//type-operation.model';

export interface IOperation {
    id?: number;
    montant?: number;
    fraiscommission?: number;
    dateoperations?: Moment;
    utilisateurs?: IUtilisateur[];
    typeoperations?: ITypeOperation[];
}

export class Operation implements IOperation {
    constructor(
        public id?: number,
        public montant?: number,
        public fraiscommission?: number,
        public dateoperations?: Moment,
        public utilisateurs?: IUtilisateur[],
        public typeoperations?: ITypeOperation[]
    ) {}
}
