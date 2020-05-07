import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {

  @ViewChild('detail') detail: ElementRef;
  public stats: Array<any>;
  public idStatsDetails:string;
  public homeTeamId: number;
  public visitorTeamId: number;
  public homeTeam: any;
  public visitorTeam: any;
  public playersByTeam:Array<any>;
  public homeTeamPlayers: Array<any>;
  public visitorTeamPlayers: Array<any>;
  public game: any;
  public gameSelected: any;
  public teams: Array<any>;
  public playerStats:any;
  public pageStats:boolean;
  constructor(private activateRouter: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit(): void {
    this.pageStats = true;
    this.stats = this.activateRouter.snapshot.data.stats.data;
    this.idStatsDetails = this.activateRouter.snapshot.params.id;
    this.game = this.stats[0].game;
    this.homeTeamId = this.game.home_team_id;
    this.visitorTeamId = this.game.visitor_team_id;

    this.teamService.getTeamImagesById([this.homeTeamId, this.visitorTeamId]).subscribe(data => {
      this.homeTeam = data.find(team => team.id_team === this.homeTeamId);
      this.visitorTeam = data.find(team => team.id_team === this.visitorTeamId);
      this.teams = [this.homeTeam, this.visitorTeam];
      this.homeTeamPlayers = this.stats.filter(p => p.team.id === this.homeTeamId);
      this.visitorTeamPlayers = this.stats.filter(p => p.team.id === this.visitorTeamId);
      this.playersByTeam = [this.homeTeamPlayers, this.visitorTeamPlayers];
      this.gameSelected = {game:this.game, home_team:this.homeTeam, visitor_team:this.visitorTeam};
    })
  }

  public onDetailsPlayer(event) {
    setTimeout(() => {
      this.playerStats = event;
    }, 50);
  }

  public onCloseDetails(event) {
    this.playerStats = null;
  }

}
