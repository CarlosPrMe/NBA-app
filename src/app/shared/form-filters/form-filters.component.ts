import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-filters',
  templateUrl: './form-filters.component.html',
  styleUrls: ['./form-filters.component.scss']
})
export class FormFiltersComponent implements OnInit, OnChanges {

  public myForm;
  @Input() optionsPerPage: Array<any>;
  @Input() optionsPerSeason: Array<any>;
  @Input() disabled: boolean;
  @Output() changeParamFilters = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      per_page: [this.optionsPerPage[1]],
      season: [this.optionsPerSeason[0]],
      postseason: ['']
    })
  }

  ngOnChanges(change: SimpleChanges) {
    this.disabled = change.disabled.currentValue;
  }

  public changeFilters(form) {
    this.changeParamFilters.emit(form);
  }
}
