import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  @Input() player: any;
  @Input() highlights: boolean;
  @Input() bgImage: any;
  @Input() pageStats: boolean;
  @Input() index: number;
  @Output() detailsPlayer = new EventEmitter<any>();
  public noPlayed: boolean;
  public avatars: Array<string>;
  constructor() { }

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
    this.noPlayed = !this.player.min ? true : false;
    this.player.player.avatar = this._addImagerRandom(0, this.avatars.length - 1);
    this.player.team.image_url = this.bgImage;
  }

  public showDetails($event) {
    this.detailsPlayer.emit(this.player);
  }

  private _addImagerRandom(min, max) {
    let num = Math.round(Math.random() * (max - min) + min);
    return this.avatars[num];
  }

}
