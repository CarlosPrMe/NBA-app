import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerModel } from 'src/app/models/player.model';
import { StatsModel } from '../../models/stats.model';
import { GameModel } from '../../models/game.model';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {


  @Input() player: PlayerModel;
  @Input() teamImage: string;
  @Input() textBig: boolean;
  @Input() stats: StatsModel;
  @Input() game: GameModel;
  @Input() gameId: number;
  public simpleData: boolean;
  constructor(private playerService: PlayerService, private router: Router) { }

  ngOnInit(): void {
    this.simpleData = true;
  }

  ngOnChanges(change: SimpleChanges) {
    this.stats = change.stats?.currentValue ? change.stats.currentValue : null;
    this.game = change?.stats?.currentValue?.game ? change.stats.currentValue.game : null;
    this.gameId = change.stats ? change?.gameId?.currentValue : null;
  }

  public setCurrentPlayer(event) {
    event.preventDefault();
    let current: any = { player: this.player };
    this.playerService.playerSelected.next(current);
    this.router.navigate(['player', this.player.id]);
  }
}
