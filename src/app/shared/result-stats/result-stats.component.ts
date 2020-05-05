import { Component, OnInit, Input, OnChanges, SimpleChanges, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-result-stats',
  templateUrl: './result-stats.component.html',
  styleUrls: ['./result-stats.component.scss']
})
export class ResultStatsComponent implements OnInit, OnChanges {

  @ViewChild('detail') detail: ElementRef;

  @Input() stats: Array<any>;
  @Input() idStats: string;
  @Input() game: any;
  public currentGame: any;
  public homeTeam: Array<any>;
  public homeTeamId: number;
  public homeTeamName: string;
  public homeTeamImage: string;
  public visitorTeam: Array<any>;
  public visitorTeamId: number;
  public visitorTeamName: string;
  public visitorTeamImage: string;
  public playerStats: any;
  public gameDate: any;
  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(change: SimpleChanges) {
    this.currentGame = change.game.currentValue.game;
    this.gameDate = change.game.currentValue.game.date;
    this.homeTeamId = change.game.currentValue.home_team.id_team;
    this.visitorTeamId = change.game.currentValue.visitor_team.id_team;
    this.homeTeamName = change.game.currentValue.home_team.full_name;
    this.homeTeamImage = change.game.currentValue.home_team.image_url
    this.visitorTeamName = change.game.currentValue.visitor_team.full_name;
    this.visitorTeamImage = change.game.currentValue.visitor_team.image_url
    this.homeTeam = change.stats.currentValue.filter(player => player.team.id === this.homeTeamId);
    this.visitorTeam = change.stats.currentValue.filter(player => player.team.id === this.visitorTeamId);
  }


  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.playerStats) {
      if (!this.detail?.nativeElement.contains(event.target)) {
        this.closeDetails(event);
      }
    }
  }

  onDetailsPlayer(event) {
    setTimeout(() => {
      this.playerStats = event;
    }, 50);
  }

  public closeDetails(event) {
    this.playerStats = null;
  }
}
