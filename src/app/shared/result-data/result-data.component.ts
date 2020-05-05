import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-result-data',
  templateUrl: './result-data.component.html',
  styleUrls: ['./result-data.component.scss']
})
export class ResultDataComponent implements OnInit {

  @Input() game: any;
  @Input() isFirst: boolean;
  @Output() showStatsEvent = new EventEmitter<any>();
  public teamsId: Array<number>;
  public images: Array<any>
  public homeTeam: any;
  public visitorTeam: any;
  private randomhours: Array<string>;

  constructor(private teamService: TeamService) { }
  ngOnInit(): void {
    this.randomhours = ['12:00', '17:00', '19:00', '21:00'];
    this.teamsId = new Array(this.game.home_team.id, this.game.visitor_team.id);
    this.teamService.getTeamImagesById(this.teamsId).subscribe(res => {
      this.images = res;
      this.homeTeam = this.images.find(t => t.id_team === this.game.home_team.id);
      this.visitorTeam = this.images.find(t => t.id_team === this.game.visitor_team.id);
      let day = document.getElementsByClassName('result__date')[0];
      let dateSeparated = day.textContent.split(' ');
      this.game.hourDate = this._addImagerRandom(0, this.randomhours.length - 1);
      this.game.date = dateSeparated[0];
      if (this.isFirst) {
        this.showStatsEvent.emit([this.game.id, { game: this.game, home_team: this.homeTeam, visitor_team: this.visitorTeam }]);
      }
    })
  }

  public showStats(event, game_id) {
    event.preventDefault();
    this.showStatsEvent.emit([game_id, { game: this.game, home_team: this.homeTeam, visitor_team: this.visitorTeam }])
  }

  private _addImagerRandom(min, max) {
    let num = Math.round(Math.random() * (max - min) + min);
    return this.randomhours[num];
  }
}
