import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {

  public stats:Array<any>;
  constructor(private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.stats = this.activateRouter.snapshot.data.stats;
  }

}
