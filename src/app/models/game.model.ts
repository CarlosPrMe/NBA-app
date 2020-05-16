import { TeamModel } from './team.model';

export interface GameModel {
    game?:any;
    date?: string;
    home_team: TeamModel;
    home_team_score?: number;
    hourDate?: string;
    id?: number;
    period?: number;
    postseason?: boolean;
    season?: number;
    status?: string;
    time?: string;
    visitor_team: TeamModel;
    visitor_team_score?: number;
    home_team_id?: number;
    visitor_team_id?: number;
}