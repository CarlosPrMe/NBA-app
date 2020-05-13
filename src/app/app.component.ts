import { Component, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private router: Router) { }
  title = 'app-nba';

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof Scroll) {
        window.scroll(0, 0);
      }
    })
  }
}
