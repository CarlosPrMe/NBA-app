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
  public teamsSorted: Array<any>;
  public westConference: Array<any>;
  public eastConference: Array<any>;
  public playoffWest: Array<any>;
  public playoffEast: Array<any>;
  public playoffs: Array<any>;
  public simulated: boolean;
  public winner: any;
  public details: Array<any>;
  private currentDetailId: number;

  constructor(private activateRouter: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit(): void {
    this.imageHeader = true;
    this.westConference = [];
    this.eastConference = [];
    this.teams = this.activateRouter.snapshot.data.teams;
    this.teams.forEach((team: any) => {
      team.won_games = this._randomNumber(0, this.teams.length);
    })
    this.teams = this._sortByWonGames(this.teams);
    this.teams.forEach(team => team.conference === "East" ? this.eastConference.push(team) : this.westConference.push(team));
    this.teamsSorted = [this.westConference, this.eastConference];
    this._createTeams();
  }


  private _sortByWonGames(teams: Array<any>): Array<any> {
    return teams.sort((a, b) => b.won_games - a.won_games);
  }

  private _randomNumber(min, max) {
    let num = Math.round(Math.random() * (max - min) + min);
    return num;
  }

  private _matchPlayOffs(teams: Array<any>, matchs): Array<any> {
    let teamsSorted = [];
    let length = teams.length - 1
    for (let i = 0; i < matchs; i++) {
      let match = [teams[i], teams[length - i]];
      teamsSorted.push(match);
    }
    return teamsSorted;
  }

  private _createTeams() {
    this.playoffWest = this.westConference.slice(0, 8);
    this.playoffWest = [this._matchPlayOffs(this.playoffWest, 4), new Array([], []), new Array([]), new Array([])];
    this.playoffEast = this.eastConference.slice(0, 8);
    this.playoffEast = [this._matchPlayOffs(this.playoffEast, 4), new Array([], []), new Array([]), new Array([])];
    this.playoffs = [this.playoffWest, this.playoffEast];
    this.simulated = false;
    this.winner = null;
  }

  public simulateGames() {
    this.playoffWest[1] = [[this.playoffWest[0][0][this._randomNumber(0, 1)], this.playoffWest[0][1][this._randomNumber(0, 1)]], [this.playoffWest[0][2][this._randomNumber(0, 1)], this.playoffWest[0][3][this._randomNumber(0, 1)]]];
    this.playoffWest[2] = [[this.playoffWest[1][0][this._randomNumber(0, 1)], this.playoffWest[1][1][this._randomNumber(0, 1)]]];
    this.playoffWest[3] = [[this.playoffWest[2][0][this._randomNumber(0, 1)]]];


    this.playoffEast[1] = [[this.playoffEast[0][0][this._randomNumber(0, 1)], this.playoffEast[0][1][this._randomNumber(0, 1)]], [this.playoffEast[0][2][this._randomNumber(0, 1)], this.playoffEast[0][3][this._randomNumber(0, 1)]]];
    this.playoffEast[2] = [[this.playoffEast[1][0][this._randomNumber(0, 1)], this.playoffEast[1][1][this._randomNumber(0, 1)]]];
    this.playoffEast[3] = [[this.playoffEast[2][0][this._randomNumber(0, 1)]]];

    this.winner = [this.playoffWest[3][0][0], this.playoffEast[3][0][0]][this._randomNumber(0, 1)];
    this.simulated = true;
  }

  public resetGames() {
    this._createTeams()
  }

  public showDetails(event, id) {
    event.preventDefault();
    debugger
    if (id !== this.currentDetailId) {
      this.currentDetailId = id;
      this.details = null;
      this.teamService.getGamesByTeam(id).subscribe(res => {
        this.details = res.data;
        console.log(this.details);
      })
    }
  }

}