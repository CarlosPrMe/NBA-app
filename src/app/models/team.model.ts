import { PlayerModel } from './player.model';

export interface TeamModel {
    abbreviation?: string;
    city?: string;
    conference?: string;
    division?: string;
    full_name?: string;
    id?: string;
    id_team?: number;
    image_url?: string;
    name?: string;
    team_color?:string;
    players?:Array<PlayerModel>
}