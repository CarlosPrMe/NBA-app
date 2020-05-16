import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerModel } from 'src/app/models/player.model';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit {

  public player: PlayerModel;
  constructor(private activate: ActivatedRoute) { }

  ngOnInit(): void {

    this.player = this.activate.snapshot.data.player;
  }

}
