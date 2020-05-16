import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PlayerModel } from '../models/player.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private rapid_headers: any
  private url: string = environment.localUrl;
  constructor(private http: HttpClient) {
    this.rapid_headers = {
      "x-rapidapi-host": "free-nba.p.rapidapi.com",
      "x-rapidapi-key": "0577e6108amshf0cc140309a1e1cp18138bjsna1a1ba56bf67"
    }
  }

  getPlayerById(id:number):Observable<any> {
    let headers = new HttpHeaders(this.rapid_headers)
    return this.http.get(`https://free-nba.p.rapidapi.com/players/${id}`, { headers: headers })
  }
}
