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
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamsId = new Array(this.game.home_team.id, this.game.visitor_team.id);
    this.teamService.getTeamImagesById(this.teamsId).subscribe(res => {
      this.images = res;
      this.homeTeam = this.images.find(t => t.id_team === this.game.home_team.id);
      this.visitorTeam = this.images.find(t => t.id_team === this.game.visitor_team.id);
      if (this.isFirst) {
        this.showStatsEvent.emit([this.game.id, { home_team: this.homeTeam, visitor_team: this.visitorTeam }]);
      }
    })
  }

  showStats(event, game_id) {
    event.preventDefault();
    this.showStatsEvent.emit([game_id, { home_team: this.homeTeam, visitor_team: this.visitorTeam }])
  }
}
