import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-filters',
  templateUrl: './form-filters.component.html',
  styleUrls: ['./form-filters.component.scss']
})
export class FormFiltersComponent implements OnInit {

  public myForm;
  @Input() optionsPerPage:Array<any>;
  @Input() optionsPerSeason:Array<any>;
  @Output() changeParamFilters = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      per_page:[this.optionsPerPage[1]],
      season: [this.optionsPerSeason[0]]
    })
  }

  public changeFilters(form){
    let newRequest = {...form};
    this.changeParamFilters.emit(newRequest);
  }

}
