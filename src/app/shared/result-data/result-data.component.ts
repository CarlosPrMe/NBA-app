import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { TeamModel } from 'src/app/models/team.model';
import { GameModel } from 'src/app/models/game.model';

@Component({
  selector: 'app-result-data',
  templateUrl: './result-data.component.html',
  styleUrls: ['./result-data.component.scss']
})
export class ResultDataComponent implements OnInit, OnChanges {

  @Input() game: GameModel;
  @Input() gameSimple: GameModel;
  @Input() isFirst: boolean;
  @Input() simpleData: boolean;
  @Output() showStatsEvent = new EventEmitter<any>();
  public teamsId: Array<number>;
  public images: Array<any>
  public homeTeam: TeamModel;
  public visitorTeam: TeamModel;
  public gameId: number;
  private randomhours: Array<string>;
  @Input() gameSelected: number;

  constructor(private teamService: TeamService) { }
  ngOnInit(): void {
    this._configureTeams();
  }

  ngOnChanges(change: SimpleChanges) {

    if (change?.gameSimple?.currentValue) {
      this.gameSimple = change.gameSimple.currentValue;
      this._configureTeams();
    }
  }


  public showStats(event, game_id) {
    event.preventDefault();
    if (this.gameSelected !== game_id) {
      this.showStatsEvent.emit([game_id, { game: this.game ? this.game : this.gameSimple, home_team: this.homeTeam, visitor_team: this.visitorTeam }])
    }
  }

  private _configureTeams() {
    this.gameId = this.gameSimple ? this.gameSimple.id : this.game.id
    this.randomhours = ['12:00', '17:00', '19:00', '21:00'];
    this.teamsId = this.gameSimple ? [this.gameSimple.home_team_id, this.gameSimple.visitor_team_id] : new Array(+this.game.home_team.id, +this.game.visitor_team.id);
    this.teamService.getTeamImagesById(this.teamsId).subscribe(res => {
      this.images = res;
      this.homeTeam = this.images.find(t => {
        if (this.game && t.id_team === this.game.home_team.id) {
          return true;
        } else if (this.gameSimple && t.id_team === this.gameSimple.home_team_id) {
          return true
        }
      });
      this.visitorTeam = this.images.find(t => {
        if (this.game && t.id_team === this.game.visitor_team.id) {
          return true
        } else if (this.gameSimple && t.id_team === this.gameSimple.visitor_team_id) {
          return true
        }
      });
      let day = document.getElementsByClassName('result__date')[0];
      if (day) {
        let dateSeparated = day?.textContent?.split(' ');
        this.game.hourDate = this._addImagerRandom(0, this.randomhours.length - 1);
        this.game.date = dateSeparated ? dateSeparated[0] : null;
      }
      if (this.isFirst) {
        this.showStatsEvent.emit([this.gameId, { game: this.game ? this.game : this.gameSimple, home_team: this.homeTeam, visitor_team: this.visitorTeam }]);
      }
    });
  }

  private _addImagerRandom(min, max) {
    let num = Math.round(Math.random() * (max - min) + min);
    return this.randomhours[num];
  }
}
