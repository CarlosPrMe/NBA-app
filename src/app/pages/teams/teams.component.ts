import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  public imageHeader: boolean;
  public teams: Array<any>;
  public westConference: Array<any>;
  public eastConference: Array<any>;

  constructor(private activateRouter: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit(): void {
    this.imageHeader = true;
    this.westConference = [];
    this.eastConference = [];
    this.teams = this.activateRouter.snapshot.data.teams;
    this.teams.forEach((team: any) => {
      team.won_games = this._randomWonGames(0, this.teams.length);
    })
    this.teams = this._sortByWonGames(this.teams);
    this.teams.forEach(team => team.conference === "East" ? this.eastConference.push(team) : this.westConference.push(team));
  }


  private _sortByWonGames(teams: Array<any>): Array<any> {
    return teams.sort((a, b) => b.won_games - a.won_games);
  }

  private _randomWonGames(min, max) {
    let num = Math.round(Math.random() * (max - min) + min);
    return num;
  }

}
