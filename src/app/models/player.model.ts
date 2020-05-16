import { TeamModel } from './team.model';

export interface PlayerModel {
    first_name?: string;
    height_feet?: number;
    height_inches?: number;
    id?: number;
    last_name?: string;
    position?: string;
    team?: TeamModel;
    name?: string;
    weight_pounds?:number
    avatar?:string
}