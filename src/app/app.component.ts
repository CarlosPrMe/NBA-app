import { Component, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { SearcherService } from './services/searcher.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private _router: Router, private _searcherService: SearcherService) { }
  title = 'app-nba';

  ngOnInit() {
    this._router.events.subscribe(val => {
      if (val instanceof Scroll) {
        window.scroll(0, 0);
        this._searcherService.searcherShow.next(false);
      }
    })
  }
}
