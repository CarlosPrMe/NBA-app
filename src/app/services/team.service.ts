import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private _url: string = environment.localUrl;
  private _apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getAllTeams(): Observable<any> {
    return this.http.get("https://free-nba.p.rapidapi.com/teams?page=0");
  }

  public getLogos(): Observable<any> {
    return this.http.get(`${this._url}teams`);
  }

  public getTeamById(id): Observable<any> {
    return this.http.get(`${this._url}team/${id}`);
  }

  public getTeamImagesById(ids): Observable<any> {
    return this.http.post(`${this._url}team-image`, ids);
  }

  public getMatchYesterday(dates: string, page: number = 0, per_page: number = 25): Observable<any> {
    return this.http.get(`${this._apiUrl}/games?page=${page}&per_page=${per_page}${dates}`);
  }

  public getStatsById(id): Observable<any> {
    return this.http.get(`${this._apiUrl}/stats?game_ids[]=${id}&page=0&per_page=30}`);
  }

  public getGamesByTeam(id: number, page: number = 0, perPage: number = 10, year: string = '2019', date: string = ''): Observable<any> {
    let seasons = this._checkParams(year, date);
    let dateChecked = date ? `&dates[]=${date}` : '';
    return this.http.get(`${this._apiUrl}/games?team_ids[]=${id}${seasons}&page=${page}&per_page=${perPage}${dateChecked}"}`);
  }

  public getTeamByName(name: string): Observable<any> {
    let request = { team_name: name }
    return this.http.post(`${this._url}team-name`, request)
  }

  private _checkParams(year, date) {
    if (date) {
      return '';
    } else if (year && !date) {
      return `&seasons[]=${year}`;
    } else if (!year) {
      return '&seasons[]=2019';
    }
  }
}
