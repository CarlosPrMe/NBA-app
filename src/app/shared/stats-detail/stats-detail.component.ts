import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stats-detail',
  templateUrl: './stats-detail.component.html',
  styleUrls: ['./stats-detail.component.scss']
})
export class StatsDetailComponent implements OnInit {

  @Input() player: any;
  @Output() deleteDetails = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
    this.player;
    console.log(this.player);
  }


  public closeDetails(event) {
    this.deleteDetails.emit(null)
  }

}
