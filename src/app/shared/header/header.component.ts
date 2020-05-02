import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamModel } from 'src/app/models/team.model';

@Component({
  selector: 'app-header-team',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() team: TeamModel;
  @Output() newFavourite = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  addToFavourites($event) {
    this.newFavourite.emit(this.team.id_team);
    console.log(this.team.id_team);
  }

}
