import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamModel } from 'src/app/models/team.model';
import { GameModel } from 'src/app/models/game.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() team: TeamModel;
  @Input() game: GameModel;
  @Input() teams: Array<TeamModel>;
  @Input() backgroundImg:string;
  @Output() newFavourite = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  public addToFavourites($event) {
    this.newFavourite.emit(this.team.id_team);
  }

}
