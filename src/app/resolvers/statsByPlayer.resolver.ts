import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerService } from '../services/player.service';
import { PlayerModel } from '../models/player.model';

@Injectable({ providedIn: 'root' })

export class StatsByPlayerResolver implements Resolve<PlayerModel> {

    constructor(private playerService: PlayerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.playerService.getStatsPlayerById(+route.paramMap.get('id'))
    }
}