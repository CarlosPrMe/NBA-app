import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamService } from '../services/team.service';

@Injectable({ providedIn: 'root' })
export class StatsResolver implements Resolve<any> {

    constructor(private teamService: TeamService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.teamService.getStatsById(route.paramMap.get('id'));
    }
}
