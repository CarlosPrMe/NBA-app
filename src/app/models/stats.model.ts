import { GameModel } from './game.model';
import { PlayerModel } from './player.model';
import { TeamModel } from './team.model';

export interface StatsModel {

    ast: number
    blk: number
    dreb: number
    fg3_pct: number
    fg3a: number
    fg3m: number
    fg_pct: number
    fga: number
    fgm: number
    ft_pct: number
    fta: number
    ftm: number
    game: GameModel
    id: number
    min: string
    oreb: number
    pf: number
    player: PlayerModel
    pts: number
    reb: number
    stl: number
    team: TeamModel
    turnover: number
}

