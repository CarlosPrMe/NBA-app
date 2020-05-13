import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamModel } from '../models/team.model';
import { TeamService } from '../services/team.service';

@Injectable({ providedIn: 'root' })

export class GamesResolver implements Resolve<TeamModel> {

    constructor(private teamService: TeamService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.teamService.getGamesByTeam(+route.paramMap.get('id'));
    }

    // getGamesByTeam(id: number, page: number = 0, perPage: number = 10, year: string = '2018'): Observable<any> {
    //     let mis_headers = new HttpHeaders(this.rapid_headers);
    //     return this.http.get(`https://free-nba.p.rapidapi.com/games?seasons[]=${year}&team_ids[]=${id}&page=${page}&per_page=${perPage}"}`, { headers: mis_headers });
    //   }
}