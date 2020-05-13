import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamModel } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  public idTeam: string;
  public team: TeamModel;
  public players: Array<any>;
  public games: Array<any>;
  public meta: any;
  public avatars: Array<any>;
  constructor(private activate: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit(): void {
    this.avatars = [
      'https://lh3.googleusercontent.com/-d-cldq0iIFQ/WpakxI3OXoI/AAAAAAAAOs0/v7lpT9KuFvMWyYUlcFBvonmUTFcfkbFhACHMYCw/avatar-santi%255B2%255D?imgmax=800',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHWAoQ916iRw6xL3xgw8ebhq_XYl6yhiFeq1DMQuQRqLmOR7vv2g&s',
      'https://www.itcsystem.es/wp-content/uploads/2019/01/avatar-372-456324.png',
      'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png',
      'https://www.sysasesoressas.com/sys/wp-content/uploads/2019/02/avatar-367-456319.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSItZgJYGhLiceCc4CuuAGUgIrr72JvyY4I8ljkmVGMdCeaZd&s',
      'https://image.flaticon.com/icons/png/512/190/190634.png',
      'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/19-512.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcatI3vf8wLOxUtNrTKIgFVYJgqg5bjFm90BMhg_5iISO976p&s'
    ]
    this.team = this.activate.snapshot.data.team;
    this.games = this.activate.snapshot.data.games.data;
    this.meta = this.activate.snapshot.data.games.meta;
    this.teamService.getStatsById(this.games[0].id).subscribe(res => {
      this.players = res.data.filter(p => {
        if (p.team.id === this.team.id_team) {
          return p.player;
        }
      }).map(p => {
        !p.avatar ? p.player.avatar = this._addImagerRandom(0, this.avatars.length - 1) : null;
        return p.player
      })
      debugger
      console.log(this.players);
    })
  }

  private _addImagerRandom(min, max) {
    let num = Math.round(Math.random() * (max - min) + min);
    return this.avatars[num];
  }
}
