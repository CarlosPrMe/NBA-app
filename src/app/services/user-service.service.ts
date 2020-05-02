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
  private url:string = environment.localUrl
  constructor(private httpClient: HttpClient) { }

  addUser(user):Observable<any>{
   return this.httpClient.post(`${this.url}user-register`, user);
  }

  getUSer(user):Observable<any>{
    return this.httpClient.post(`${this.url}oauth`, user);
  }
}
