import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { StatsModel } from 'src/app/models/stats.model';

@Component({
  selector: 'app-stats-detail',
  templateUrl: './stats-detail.component.html',
  styleUrls: ['./stats-detail.component.scss']
})
export class StatsDetailComponent implements OnInit {

  @Input() player: StatsModel;
  @Output() deleteDetails = new EventEmitter<any>();
  @ViewChild('detail') detail: ElementRef;

  constructor() { }

  ngOnInit(): void { }


  public closeDetails(event) {
    this.deleteDetails.emit(null)
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.player) {
      if (!this.detail?.nativeElement.contains(event.target)) {
        this.closeDetails(event);
        this.player = null
      }
    }
  }
}
