import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private rapid_headers: any
  private url: string = environment.localUrl;
  constructor(private http: HttpClient) {
    this.rapid_headers = {
      "x-rapidapi-host": "free-nba.p.rapidapi.com",
      "x-rapidapi-key": "0577e6108amshf0cc140309a1e1cp18138bjsna1a1ba56bf67"
    }
  }

  getAllTeams(): Observable<any> {
    let mis_headers = new HttpHeaders(this.rapid_headers);
    return this.http.get("https://free-nba.p.rapidapi.com/teams?page=0", { headers: mis_headers });
  }

  getLogos(): Observable<any> {
    return this.http.get(`${this.url}teams`);
  }

  getTeamById(id): Observable<any> {
    return this.http.get(`${this.url}team/${id}`);
  }

  getTeamImagesById(ids): Observable<any> {
    return this.http.post(`${this.url}team-image`, ids);
  }

  getMatchYesterday(dates: string, page: number = 0, per_page: number = 25): Observable<any> {
    let mis_headers = new HttpHeaders(this.rapid_headers);
    return this.http.get(`https://free-nba.p.rapidapi.com/games?page=${page}&per_page=${per_page}${dates}`, { headers: mis_headers });
  }

  getStatsById(id): Observable<any> {
    let mis_headers = new HttpHeaders(this.rapid_headers);
    return this.http.get(`https://free-nba.p.rapidapi.com/stats?game_ids[]=${id}&page=0&per_page=30}`, { headers: mis_headers });
  }

  getGamesByTeam(id: number, page: number = 0, perPage: number = 10, year: string = '2019'): Observable<any> {
    let mis_headers = new HttpHeaders(this.rapid_headers);
    return this.http.get(`https://free-nba.p.rapidapi.com/games?seasons[]=${year}&team_ids[]=${id}&page=${page}&per_page=${perPage}"}`, { headers: mis_headers });
  }

  // getManyGamesById(ids:Array<number>, page: number = 0, perPage: number = 10, year: string = '2019'):Observable<any>{
  //   let mis_headers = new HttpHeaders(this.rapid_headers);
  //   return this.http.get(`https://free-nba.p.rapidapi.com/games?seasons[]=${year}&${this._setManyIds(ids)}&page=${page}per_page=${perPage}"}`, { headers: mis_headers });
  // }

  // private _setManyIds(ids:Array<number>):string{
  //   let string = ids.map(id => `team_ids[]=${id}&`).join('');
  //   debugger
  //   return string;
  // }
}
