import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() data: any;
  @Output() changePage = new EventEmitter<any>();
  public totalPages: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.data;
    this.totalPages = this._createPages(this.data.total_pages);
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
