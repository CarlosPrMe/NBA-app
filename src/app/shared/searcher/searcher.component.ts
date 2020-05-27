import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { SearcherService } from 'src/app/services/searcher.service';
import { FormBuilder } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { TeamModel } from 'src/app/models/team.model';
import { PlayerModel } from 'src/app/models/player.model';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit, AfterContentChecked {

  public sercherState: boolean;
  public myForm;
  public resultsPlayers: Array<PlayerModel>;
  public resultsTeams: Array<TeamModel>;
  public fieldDisabled: boolean;
  public searched: boolean;
  public teamOptions: Array<TeamModel>;
  private currentSearch: string;
  public seasonsAvailable: Array<number>

  @ViewChild('searcher') searcher: ElementRef;
  @ViewChild('input') input: ElementRef;
  @ViewChild('statsDate') statsDate: ElementRef;
  private content;

  constructor(private searcherService: SearcherService, private fb: FormBuilder,
    private playerService: PlayerService, private router: Router, private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService.getLogos().subscribe(res => {
      this.teamOptions = res;
    })
    this.searched = false;
    this.fieldDisabled = true;
    this.seasonsAvailable = this._getSeasons(2019);
    this.resultsPlayers = [];
    this.resultsTeams = [];
    this.currentSearch = 'player';
    this.searcherService.searcherShow.subscribe(res => {
      this.sercherState = res;
    })

    this._createForm();
  }

  ngAfterContentChecked() {
    if (this.searcher) {
      this.content = this.searcher.nativeElement;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.searcherService.searcherShow.value && !this.content.contains(event.target) && !event.target.classList.contains('nav__link--btn')) {
      this.searcherService.searcherShow.next(false);
      this._setData();
      this._createForm();
    }
  }

  public submit(form) {
    this._checkForm(form);
  }

  public resetSearch(event, param, origin) {
    event.preventDefault();
    debugger
    this.playerService.playerSelected.next(null);
    this.searcherService.currentSeason.next(null);
    this._setData();
    this._createForm();
    origin === 'isPlayer' ? this.router.navigate(['player', param]) : this.router.navigate(['team', param])
  }

  private _createForm() {
    this.myForm = this.fb.group({
      text: [''],
      date: [''],
      type: ['player'],
      teamSelected: [1],
      stats: [false],
      season: [this.seasonsAvailable[0]],
      seasonStats: [false]
    })

    this.myForm.valueChanges.subscribe(data => {
      if (data.stats) {
        this.fieldDisabled = false;
      } else {
        this.fieldDisabled = true;
        this.statsDate.nativeElement.value = false;
        this.statsDate.nativeElement.checked = false;
      }
      if (this.searched && data.text.length === 0 || data.stats || (data.text.length > 0 && this.currentSearch !== data.type)) {
        this.currentSearch = data.type;
        this._setData();
        this.input.nativeElement.value = '';
      }
    })
    this.fieldDisabled = true;
  }

  private _checkForm(form) {

    if (form.stats) {
      if (!form.seasonStats) {
        this._createForm();
        debugger
        this.searcherService.currentSeason.next(form.season);
        this.router.navigate(['team', +form.teamSelected]);
      } else {
        this.teamService.getGamesByTeam(form.teamSelected, 1, 120, null, form.date).subscribe(data => {
          debugger
        })
      }

    } else {
      if (form.type === 'player' && form.text.length > 1) {
        this.searcherService.getPlayers(form.text).subscribe(res => {
          this._setData(true, res.data, []);
        })
      } else if (form.type === 'team' && form.text.length > 1) {
        this.teamService.getTeamByName(form.text).subscribe(res => {
          this._setData(true, [], res);
        })
      }
    }
  }

  private _setData(searchedStatus: boolean = false, players: Array<PlayerModel> = [], teams: Array<TeamModel> = []): void {
    this.searched = searchedStatus;
    this.resultsPlayers = players;
    this.resultsTeams = teams;
  }

  private _getSeasons(lastYear) {
    let seasons = [];
    for (let i = lastYear; i > 1974; i--) {
      seasons.push(i)
    }
    return seasons;
  }
}
