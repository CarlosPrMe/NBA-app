import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private teamService: TeamService) { }
  public caca: any;
  public date: string;
  public games: Array<any>;
  ngOnInit(): void {

    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();

    this.date = `${year - 2}-${month }-${day-3}`
    this.teamService.getMatchYesterday(this.date).subscribe(res => {
      this.games = res.data
    })
  }

}
