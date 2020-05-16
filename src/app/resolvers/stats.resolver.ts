import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamService } from '../services/team.service';
import { StatsModel } from '../models/stats.model';

@Injectable({ providedIn: 'root' })
export class StatsResolver implements Resolve<StatsModel> {

    constructor(private teamService: TeamService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.teamService.getStatsById(route.paramMap.get('id'));
    }
}
