import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, HostListener } from '@angular/core';
import { PaginatorModel } from 'src/app/models/pagintor.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() data: PaginatorModel;
  @Input() disabled: boolean;
  @Output() changePage = new EventEmitter<any>();
  public totalPages: Array<number>;
  public numPages: number;

  constructor() { }

  ngOnInit(): void {
    this.numPages = this._changeNumViewPages()
  }

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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.numPages = this._changeNumViewPages();
  }

  private _changeNumViewPages(): number {
    return window.screen.width < 370 ? 9 : 10;
  }

}
