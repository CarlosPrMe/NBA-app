import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public show:boolean = false;
  public changeShow = new BehaviorSubject(this.show);
  constructor() { }

  changeSpinnerState(){
    this.show = !this.show;
    this.changeShow.next(this.show);
  }
}
