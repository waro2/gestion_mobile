import { Moment } from 'moment';
import { IOperateur } from 'app/shared/model//operateur.model';
import { ICommission } from 'app/shared/model//commission.model';
import { IMouvement } from 'app/shared/model//mouvement.model';

export interface ICompte {
    id?: number;
    numcompte?: string;
    datecreation?: Moment;
    datederniereoperation?: Moment;
    operateur?: IOperateur;
    commission?: ICommission;
    mouvement?: IMouvement;
}

export class Compte implements ICompte {
    constructor(
        public id?: number,
        public numcompte?: string,
        public datecreation?: Moment,
        public datederniereoperation?: Moment,
        public operateur?: IOperateur,
        public commission?: ICommission,
        public mouvement?: IMouvement
    ) {}
}
