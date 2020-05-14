import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamModel } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit, AfterViewChecked {

  @ViewChild('container') container: ElementRef;
  private offsetTop: number;
  public idTeam: string;
  public team: TeamModel;
  public players: Array<any>;
  public games: Array<any>;
  public meta: any;
  public avatars: Array<any>;
  public pagesNum: Array<any>;
  public smallTeamName: boolean;
  private perPage: any;
  public seasonsAvailable: any;
  constructor(private activate: ActivatedRoute, private teamService: TeamService, private userService: UserService) { }

  ngOnInit(): void {
    this.perPage = 10;
    this.smallTeamName = true;
    this.pagesNum = [5, 10, 15];
    this.seasonsAvailable = [2018, 2017, 2016, 2015, 2014];
    this.team = this.activate.snapshot.data.team;
    this.games = this.activate.snapshot.data.games.data;
    this.meta = this.activate.snapshot.data.games.meta;

    if (!this.players) {
      this.teamService.getStatsById(this.games[0].id).subscribe(res => {
        this.players = res.data.filter(p => {
          if (p.team.id === this.team.id_team) {
            return p.player;
          }
        }).map(p => {
          !p.avatar ? p.player.avatar = this.userService.setAvatar() : null;
          return p.player
        })
      })
    }
  }

  ngAfterViewChecked() {
    if (!this.offsetTop) this.offsetTop = this.container.nativeElement.offsetTop;
  }

  public onChangePage(event) {
    this.teamService.getGamesByTeam(this.team.id_team, event, this.perPage).subscribe(res => {
      this.games = res.data;
      this.meta = res.meta;
      this._scroll();
    })
  }

  public onChangeParamFilters(event) {
    this.perPage = event.per_page;
    this.teamService.getGamesByTeam(this.team.id_team, 1, event.per_page).subscribe(res => {
      this.games = res.data;
      this.meta = res.meta;
      this._scroll();
    })
  }

  private _scroll() {
    window.scroll({
      top: this.offsetTop - 50,
      left: 0,
      behavior: "smooth"
    })
  }
}
