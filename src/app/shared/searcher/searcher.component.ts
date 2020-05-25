import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { SearcherService } from 'src/app/services/searcher.service';
import { FormBuilder } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit, AfterContentChecked {

  public sercherState: boolean;
  public myForm;
  public results: Array<any>;
  @ViewChild('searcher') searcher: ElementRef;
  private content;
  constructor(private searcherService: SearcherService, private fb: FormBuilder,
    private playerService: PlayerService, private router: Router) { }

  ngOnInit(): void {
    this.searcher;
    this.results = [];
    this.searcherService.searcherShow.subscribe(res => {
      this.sercherState = res;
    })

    // this.myForm = this.fb.group({
    //   text: [''],
    //   date: [''],
    //   type: ['player']
    // })

    this._createForm();

    this.myForm.valueChanges.subscribe(data => {
      // debugger
      // this._checkForm(data);
    })
  }

  ngAfterContentChecked() {
    if (this.searcher) {
      this.content = this.searcher.nativeElement;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.searcherService.searcherShow.value && !this.content.contains(event.target) && !event.target.classList.contains('nav__link--btn')) {
      this.searcherService.searcherShow.next(false)
    }
  }

  public submit(form) {
    this._checkForm(form);
  }

  public resetSearch(event, playerId) {
    this.playerService.playerSelected.next(null);
    this.results = [];
    this._createForm();
    this.router.navigate(['player', playerId])
  }

  private _createForm() {
    this.myForm = this.fb.group({
      text: [''],
      date: [''],
      type: ['player']
    })
  }

  private _checkForm(form) {
    if (form.type === 'player') {
      console.log(form.text);
      this.searcherService.getPlayers(form.text).subscribe(res => {
        this.results = res.data
      })
    }

    if (form.type === 'team') {
      console.log(form.text)
    }
  }
}
