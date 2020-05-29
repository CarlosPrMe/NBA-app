import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public playerSelected = new BehaviorSubject(null);
  private rapid_headers: any
  private _url: string = environment.apiUrl;
  constructor(private _http: HttpClient) { }

  getPlayerById(id: number): Observable<any> {
    return this._http.get(`${this._url}/players/${id}`);
  }

  getStatsPlayerById(id: number, page: number = 0, per_page: number = 10, season: string = '2019'): Observable<any> {
    return this._http.get(`${this._url}/stats?page=${page}&per_page=${per_page}&player_ids[]=${id}&seasons[]=${season}`);
  }
}
