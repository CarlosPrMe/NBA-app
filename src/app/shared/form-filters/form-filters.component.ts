import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-filters',
  templateUrl: './form-filters.component.html',
  styleUrls: ['./form-filters.component.scss']
})
export class FormFiltersComponent implements OnInit, OnChanges {

  public myForm;
  @Input() optionsPerPage: Array<object>;
  @Input() optionsPerSeason: Array<number>;
  @Input() disabled: boolean;
  @Input() currentSeason: string;
  @Output() changeParamFilters = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    let paintSeason = this.currentSeason || this.optionsPerSeason[0]
    this.myForm = this.fb.group({
      per_page: [this.optionsPerPage[1]],
      season: [paintSeason],
      postseason: ['']
    })
  }

  ngOnChanges(change: SimpleChanges) {
    const { disabled, currentSeason } = change;
    this.disabled = disabled?.currentValue;
    this.currentSeason
    debugger
    if (!this.currentSeason && !currentSeason?.firstChange) {
      let paintSeason = currentSeason?.currentValue || this.optionsPerSeason[0]
      this.myForm.get('season').setValue(paintSeason)
    }
  }

  public changeFilters(form) {
    this.changeParamFilters.emit(form);
  }
}
