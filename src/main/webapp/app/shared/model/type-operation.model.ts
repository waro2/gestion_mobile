import { IOperation } from 'app/shared/model//operation.model';

export interface ITypeOperation {
    id?: number;
    retrait?: string;
    depot?: string;
    achatcredit?: string;
    operation?: IOperation;
}

export class TypeOperation implements ITypeOperation {
    constructor(
        public id?: number,
        public retrait?: string,
        public depot?: string,
        public achatcredit?: string,
        public operation?: IOperation
    ) {}
}
