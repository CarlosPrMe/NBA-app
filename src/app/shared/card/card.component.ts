import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  @Input() player: any;
  @Input() teamImage: string;
  public avatars: Array<any>;
  constructor() { }

  ngOnInit(): void { }
}
