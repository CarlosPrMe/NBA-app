import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerModel } from 'src/app/models/player.model';
import { StatsModel } from '../../models/stats.model';

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
  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(change: SimpleChanges) {
    this.stats = change.stats ? change.stats.currentValue : null;
    debugger
  }
}
