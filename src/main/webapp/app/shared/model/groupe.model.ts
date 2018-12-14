import { IGroupeUser } from 'app/shared/model//groupe-user.model';

export interface IGroupe {
    id?: number;
    nom?: string;
    description?: string;
    groupeUser?: IGroupeUser;
}

export class Groupe implements IGroupe {
    constructor(public id?: number, public nom?: string, public description?: string, public groupeUser?: IGroupeUser) {}
}
