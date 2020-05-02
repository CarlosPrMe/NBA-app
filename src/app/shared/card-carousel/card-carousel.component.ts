import { Component, OnInit, Input } from '@angular/core';
import { TeamModel } from 'src/app/models/team.model';
import { BgImageDirective } from '../../directives/bg-image.directive';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss']
})
export class CardCarouselComponent implements OnInit {

  @Input() team: TeamModel;
  constructor() { }

  ngOnInit(): void {};

}
