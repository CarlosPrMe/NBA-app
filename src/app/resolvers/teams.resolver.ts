import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamModel } from '../models/team.model';
import { TeamService } from '../services/team.service';

@Injectable({ providedIn: 'root' })
export class TeamsResolver implements Resolve<TeamModel> {

    constructor(private _teamService: TeamService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this._teamService.getLogos();
    }
}