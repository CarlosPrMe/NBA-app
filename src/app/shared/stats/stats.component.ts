import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

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
  @Input() mvp: boolean;
  @Output() detailsPlayer = new EventEmitter<any>();
  public noPlayed: boolean;
  public avatars: Array<string>;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.noPlayed = !this.player.min ? true : false;
    !this.player.player.avatar ? this.player.player.avatar = this.userService.setAvatar() : null;
    this.player.team.image_url = this.bgImage;
  }

  public showDetails($event) {
    this.detailsPlayer.emit(this.player);
  }

}
