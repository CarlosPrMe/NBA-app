import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { SearcherService } from 'src/app/services/searcher.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { TeamModel } from 'src/app/models/team.model';
import { PlayerModel } from 'src/app/models/player.model';
import { pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit, AfterContentChecked {

  public sercherState: boolean;
  public myForm: FormGroup;
  public resultsPlayers: Array<PlayerModel>;
  public resultsTeams: Array<TeamModel>;
  public fieldDisabled: boolean;
  public searched: boolean;
  public teamOptions: Array<TeamModel>;
  public seasonsAvailable: Array<number>;
  public resultsNumber: string;
  private _currentSearch: string;
  private _content;

  @ViewChild('searcher') searcher: ElementRef;
  @ViewChild('input') input: ElementRef;
  @ViewChild('statsDate') statsDate: ElementRef;

  constructor(private _searcherService: SearcherService, private _fb: FormBuilder,
    private _playerService: PlayerService, private _router: Router, private _teamService: TeamService) { }

  ngOnInit(): void {
    this._teamService.getLogos().subscribe(res => {
      this.teamOptions = res;
    })
    this.searched = false;
    this.fieldDisabled = true;
    this.seasonsAvailable = this._getSeasons(2019);
    this.resultsPlayers = [];
    this.resultsTeams = [];
    this._currentSearch = 'player';
    this.resultsNumber = '';
    this._searcherService.searcherShow.subscribe(res => {
      this.sercherState = res;
    })

    this._createForm();
  }

  ngAfterContentChecked() {
    if (this.searcher) {
      this._content = this.searcher.nativeElement;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this._searcherService.searcherShow.value && !this._content.contains(event.target) && (!event.target.classList.contains('nav__link--btn') && event.target.offsetParent.classList.contains('nav__link--btn'))) {
      this._searcherService.searcherShow.next(false);
      this._setData();
      this._createForm();
    }
  }

  public submit(form) {
    this._checkForm(form);
  }

  public resetSearch(event, param, origin) {
    event.preventDefault();
    this._playerService.playerSelected.next(null);
    this._searcherService.currentSeason.next(null);
    this._setData();
    this._createForm();
    origin === 'isPlayer' ? this._router.navigate(['player', param]) : this._router.navigate(['team', param])
  }

  private _createForm() {
    this.myForm = this._fb.group({
      text: [''],
      date: [''],
      type: ['player'],
      teamSelected: [1],
      stats: [false],
      season: [this.seasonsAvailable[0]],
      seasonStats: [false]
    })

    this.myForm.valueChanges.subscribe(data => {
      let cleanText = data.text.trim();
      this._searcherService.searcherTextLength.next(cleanText.length)
      if (data.stats) {
        this.fieldDisabled = false;
      } else {
        this.fieldDisabled = true;
        this.statsDate.nativeElement.value = false;
        this.statsDate.nativeElement.checked = false;
      }
      if (this.searched && cleanText.length === 0 || this.searched && data.stats || (cleanText.length > 0 && this._currentSearch !== data.type)) {
        this._currentSearch = data.type;
        this._setData();
        this.input.nativeElement.value = '';
        this.myForm.get('text').setValue('');
      } else if (cleanText.length > 2) {
        this._checkForm(data);
      } else if (cleanText.length <= 2) {
        this._setData();
      }
    })

    this.fieldDisabled = true;
  }

  private _checkForm(form) {
    if (form.stats) {
      if (!form.seasonStats) {
        this._createForm();
        this._searcherService.currentSeason.next(form.season);
        this._router.navigate(['team', +form.teamSelected]);
      } else {
        this._teamService.getGamesByTeam(form.teamSelected, 1, 120, null, form.date).subscribe(data => {
          let idGame = data?.data[0]?.id || null;
          if (idGame) {
            this._router.navigate(['stats', idGame]);
          } else {
            alert('No hay partidos para esa fecha elegida');
          }
          this._setData();
          this._createForm();
        })
      }

    } else {
      pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      if (form.type === 'player' && form.text.length > 2) {
        this._searcherService.getPlayers(form.text).subscribe(res => {
          this._setData(true, res.data, [], res.data.length);
        })
      } else if (form.type === 'team' && form.text.length > 2) {
        this._teamService.getTeamByName(form.text).subscribe(res => {
          this._setData(true, [], res, res.length);
        })
      }
    }
  }

  private _setData(searchedStatus: boolean = false, players: Array<PlayerModel> = [], teams: Array<TeamModel> = [], results: number = 0): void {
    this.searched = searchedStatus;
    this.resultsPlayers = players;
    this.resultsTeams = teams;
    this.resultsNumber = this._paintResults(results);
  }

  private _getSeasons(lastYear) {
    let seasons = [];
    for (let i = lastYear; i > 1974; i--) {
      seasons.push(i)
    }
    return seasons;
  }

  private _paintResults(num: number): string {
    return num > 1 ? `${num} resultados` : ''
  }
}
