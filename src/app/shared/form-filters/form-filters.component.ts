import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-form-filters',
  templateUrl: './form-filters.component.html',
  styleUrls: ['./form-filters.component.scss']
})
export class FormFiltersComponent implements OnInit, OnChanges {

  public myForm: FormGroup;
  @Input() optionsPerPage: Array<object>;
  @Input() optionsPerSeason: Array<number>;
  @Input() disabled: boolean;
  @Input() currentSeason: string;
  @Input() hidePlayoffs: boolean;
  @Input() perPage: number;
  @Input() postseasonFilter: boolean;
  @Output() changeParamFilters = new EventEmitter<any>();

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    let paintSeason = this.currentSeason || this.optionsPerSeason[0];
    this.myForm = this._fb.group({
      per_page: [this.optionsPerPage[1]],
      season: [paintSeason],
      postseason: ['']
    })
  }

  ngOnChanges(change: SimpleChanges) {
    const { disabled, currentSeason, perPage, postseasonFilter } = change;
    this.disabled = disabled?.currentValue;
    if (!this.currentSeason && !currentSeason?.firstChange) {
      let paintSeason = currentSeason?.currentValue || this.optionsPerSeason[0];
      let paintPerPage = perPage?.currentValue || 10;
      let paintPostSeason = postseasonFilter?.currentValue || false;
      this._setForm(paintSeason, paintPerPage, paintPostSeason);
    } else if (this.currentSeason && !currentSeason?.firstChange) {
      this._setForm(this.currentSeason, this.perPage, this.postseasonFilter)
    }
  }

  public changeFilters(form) {
    this.changeParamFilters.emit(form);
  }

  private _setForm(season, perPage, postseason = false) {
    this.myForm.get('season').setValue(season);
    this.myForm.get('per_page').setValue(perPage);
    this.myForm.get('postseason').setValue(postseason);
  }
}
