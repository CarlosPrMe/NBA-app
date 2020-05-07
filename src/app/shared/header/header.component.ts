import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamModel } from 'src/app/models/team.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() team: TeamModel;
  @Input() game: any;
  @Input() teams: Array<any>;
  @Output() newFavourite = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  public addToFavourites($event) {
    this.newFavourite.emit(this.team.id_team);
  }

}
