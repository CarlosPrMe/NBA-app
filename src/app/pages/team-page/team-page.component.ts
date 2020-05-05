import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute } from '@angular/router';
import { TeamModel } from 'src/app/models/team.model';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  public idTeam: string;
  public team: TeamModel;
  constructor(private teamService: TeamService, private activate:ActivatedRoute) { }

  ngOnInit(): void {
    this.team = this.activate.snapshot.data.team
  }

}
