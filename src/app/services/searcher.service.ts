import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayerModel } from '../models/player.model';


@Injectable({
  providedIn: 'root'
})
export class SearcherService {

  private rapid_headers: any
  private url: string = environment.localUrl;
  public searcherShow: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public currentSeason: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {
    this.rapid_headers = {
      "x-rapidapi-host": "free-nba.p.rapidapi.com",
      "x-rapidapi-key": "0577e6108amshf0cc140309a1e1cp18138bjsna1a1ba56bf67"
    }
  }

  getPlayers(player): Observable<any> {
    let headers = new HttpHeaders(this.rapid_headers);
    return this.httpClient.get(`https://free-nba.p.rapidapi.com/players?search=${player}`, { headers: headers })
  }


}
