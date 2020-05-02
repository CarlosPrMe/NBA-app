import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-result-box',
  templateUrl: './result-box.component.html',
  styleUrls: ['./result-box.component.scss']
})
export class ResultBoxComponent implements OnInit, OnChanges {

  @Input() games: Array<any>
  public gameSelected: any;
  public idStatsDetails: number;
  public statsDetailsData: Array<any>;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void { }
  ngOnChanges(change: SimpleChanges) {
    this.games = change.games.currentValue;
  }

  onShowStatsEvent(event) {
    this.teamService.getStatsById(event[0]).subscribe(res => {
      this.statsDetailsData = res.data;
      this.idStatsDetails = event[0];
      this.gameSelected = event[1];
    })
  }
}
