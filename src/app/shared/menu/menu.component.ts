import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  // public user:any;
  @Input() user: UserModel;
  @Output() closeSessionUser = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void { }

  closeSession(event) {
    event.preventDefault();
    this.closeSessionUser.emit(true);
  }

}
