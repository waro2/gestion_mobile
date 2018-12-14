import { Moment } from 'moment';
import { IGroupe } from 'app/shared/model//groupe.model';
import { IUtilisateur } from 'app/shared/model//utilisateur.model';

export interface IGroupeUser {
    id?: number;
    groupeutilisateur?: string;
    date?: Moment;
    groupes?: IGroupe[];
    utilisateurs?: IUtilisateur[];
}

export class GroupeUser implements IGroupeUser {
    constructor(
        public id?: number,
        public groupeutilisateur?: string,
        public date?: Moment,
        public groupes?: IGroupe[],
        public utilisateurs?: IUtilisateur[]
    ) {}
}
