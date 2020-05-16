import { Component, OnInit, Input } from '@angular/core';
import { PlayerModel } from 'src/app/models/player.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  @Input() player: PlayerModel;
  @Input() teamImage: string;
  @Input() textBig: boolean;
  constructor() { }

  ngOnInit(): void { }
}
