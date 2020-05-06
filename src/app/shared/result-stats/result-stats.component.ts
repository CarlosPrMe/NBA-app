import { Component, OnInit, Input, OnChanges, SimpleChanges, HostListener, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormBuilder, Form } from '@angular/forms';

@Component({
  selector: 'app-result-stats',
  templateUrl: './result-stats.component.html',
  styleUrls: ['./result-stats.component.scss']
})
export class ResultStatsComponent implements OnInit, OnChanges, AfterViewChecked {

  @ViewChild('detail') detail: ElementRef;
  @ViewChild('container') statsContainer: ElementRef

  @Input() stats: Array<any>;
  @Input() idStats: string;
  @Input() game: any;
  public currentGame: any;
  public homeTeam: Array<any>;
  public homeTeamId: number;
  public homeTeamName: string;
  public homeTeamImage: string;
  public visitorTeam: Array<any>;
  public visitorTeamId: number;
  public visitorTeamName: string;
  public visitorTeamImage: string;
  public playerStats: any;
  public gameDate: any;
  public myForm;
  public optionsFilter: Array<any>;
  public sortBy: string;
  public descendent: boolean;
  public showComplete: boolean;
  private statsHeight:number;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.optionsFilter = [
      {
        text: 'Puntos',
        class: 'form__input',
        value: 'pts',
      },
      {
        text: 'Rebotes',
        class: 'form__input',
        value: 'reb'
      },
      {
        text: 'Asistencias',
        class: 'form__input',
        value: 'ast'
      },
      {
        text: 'Minutos',
        class: 'form__input',
        value: 'min'
      },
    ]

    this.myForm = this.fb.group(
      {
        sort: ['pts']
      }
    )

    this.descendent = true;
    this.showComplete = false;
    this.sortTeams(this.myForm.value);

  }

  ngOnChanges(change: SimpleChanges) {
    this.currentGame = change.game.currentValue.game;
    this.gameDate = change.game.currentValue.game.date;
    this.homeTeamId = change.game.currentValue.home_team.id_team;
    this.visitorTeamId = change.game.currentValue.visitor_team.id_team;
    this.homeTeamName = change.game.currentValue.home_team.full_name;
    this.homeTeamImage = change.game.currentValue.home_team.image_url
    this.visitorTeamName = change.game.currentValue.visitor_team.full_name;
    this.visitorTeamImage = change.game.currentValue.visitor_team.image_url
    this.homeTeam = change.stats.currentValue.filter(player => player.team.id === this.homeTeamId);
    this.visitorTeam = change.stats.currentValue.filter(player => player.team.id === this.visitorTeamId);
  }

  ngAfterViewChecked(){
    if (this.statsContainer && !this.statsHeight) {
      this.statsHeight = this.statsContainer.nativeElement.clientHeight;
      this.statsContainer.nativeElement.classList.add('stats--small');
    }
  }


  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.playerStats) {
      if (!this.detail?.nativeElement.contains(event.target)) {
        this.onCloseDetails(event);
      }
    }
  }

  onDetailsPlayer(event) {
    setTimeout(() => {
      this.playerStats = event;
    }, 50);
  }

  public onCloseDetails(event) {
    this.playerStats = null;
  }

  public sortTeams(form) {
    this.sortBy = form.sort;
    this.visitorTeam = this.descendent ? this._sort(this.visitorTeam) : this._sort(this.visitorTeam).reverse();
    this.homeTeam = this.descendent ? this._sort(this.homeTeam) : this._sort(this.homeTeam).reverse();
  }

  private _sort(team: Array<any>): Array<any> {
    return team.sort((a, b) => {
      if (isNaN(b[this.sortBy])) {
        return parseFloat(b[this.sortBy]) - parseFloat(a[this.sortBy]);
      } else {
        return b[this.sortBy] - a[this.sortBy];
      }
    });
  }

  public changeOrder(event, form) {
    event.currentTarget.classList.toggle('rotate');
    this.descendent = !this.descendent;
    this.sortTeams(form)
  }

  public showMore(event) {
    this.showComplete = !this.showComplete;
    this.showComplete ? this.statsContainer.nativeElement.style.height = `${this.statsHeight}px` : this.statsContainer.nativeElement.style.height = '25rem';
  }
}
