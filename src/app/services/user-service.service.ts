import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public user: BehaviorSubject<UserModel> = new BehaviorSubject(null);
  private _url: string = environment.localUrl;
  private _avatars: Array<string> = [
    'https://lh3.googleusercontent.com/-d-cldq0iIFQ/WpakxI3OXoI/AAAAAAAAOs0/v7lpT9KuFvMWyYUlcFBvonmUTFcfkbFhACHMYCw/avatar-santi%255B2%255D?imgmax=800',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHWAoQ916iRw6xL3xgw8ebhq_XYl6yhiFeq1DMQuQRqLmOR7vv2g&s',
    'https://www.itcsystem.es/wp-content/uploads/2019/01/avatar-372-456324.png',
    'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png',
    'https://www.sysasesoressas.com/sys/wp-content/uploads/2019/02/avatar-367-456319.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSItZgJYGhLiceCc4CuuAGUgIrr72JvyY4I8ljkmVGMdCeaZd&s',
    'https://image.flaticon.com/icons/png/512/190/190634.png',
    'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/19-512.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcatI3vf8wLOxUtNrTKIgFVYJgqg5bjFm90BMhg_5iISO976p&s'
  ]
  constructor(private httpClient: HttpClient) { }

  public addUser(user): Observable<any> {
    return this.httpClient.post(`${this._url}user-register`, user);
  }

  public getUSer(user:UserModel): Observable<any> {
    return this.httpClient.post(`${this._url}oauth`, user);
  }

  public modifiUser(user:UserModel): Observable<any> {
    return this.httpClient.patch(`${this._url}user/${user._id}`, user);
  }

  public deleteUser(id:number){
    return this.httpClient.delete(`${this._url}user/${id}`);
  }

  public setAvatar(): string {
    let num = Math.round(Math.random() * ((this._avatars.length - 1) - 0) + 0);
    return this._avatars[num];
  }

  public closeSesion(): boolean {
    this.user.next(null);
    return true;
  }

  public checkFavouriteTeam(id: number, team: Array<number>): boolean {
    return team?.length && id === team[0];
  }
}
