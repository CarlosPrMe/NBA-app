import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() data: any;
  @Input() disabled: boolean;
  @Output() changePage = new EventEmitter<any>();
  public totalPages: Array<any>;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(change: SimpleChanges) {
    if (change?.data?.currentValue) {
      this.totalPages = this._createPages(change.data.currentValue.total_pages);
    }
    if (change?.disabled?.currentValue) {
      this.disabled = change.disabled.currentValue;
    }
  }

  public paginate(event, page) {
    event.preventDefault()
    this.changePage.emit(page);
  }

  private _createPages(num) {
    let array = [];
    for (let i = 1; i <= num; i++) {
      array.push(i);
    }
    return array;
  }

}
