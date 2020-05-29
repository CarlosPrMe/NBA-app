import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SearcherService {

  private rapid_headers: any;
  private _url: string = environment.apiUrl;
  public searcherShow: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public currentSeason: BehaviorSubject<string> = new BehaviorSubject(null);
  public searcherTextLength: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _http: HttpClient) { }

  getPlayers(player, nums: number = 120): Observable<any> {
    return of(player).pipe(
      switchMap((player) => this._http.get(`${this._url}/players?search=${player}&per_page=${nums}`))
    )
  }

}
