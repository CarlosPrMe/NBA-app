import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamModel } from '../models/team.model';
import { TeamService } from '../services/team.service';
import { SearcherService } from '../services/searcher.service';

@Injectable({ providedIn: 'root' })

export class GamesResolver implements Resolve<TeamModel> {

    private currentSeason: string;
    constructor(private teamService: TeamService, private searchService: SearcherService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.currentSeason = this.searchService.currentSeason.value;
        return this.teamService.getGamesByTeam(+route.paramMap.get('id'), 0, 10, this.currentSeason);
    }
}