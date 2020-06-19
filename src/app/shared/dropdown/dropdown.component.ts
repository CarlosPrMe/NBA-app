import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, HostListener, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnChanges {

  public show: boolean;
  public value: any;
  @Input('options') options: Array<any>;
  @Input('optionsObj') optionsObj: Array<object>;
  @Input('initialValue') initialValue: any;
  @Input('reset') reset: boolean;
  @Output() newValue = new EventEmitter();
  @ViewChild('list') list: ElementRef;
  @ViewChild('content') content: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.show = false;
    this.reset = false;
    this.value = this.initialValue || this.options[0];
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.reset.currentValue) {
      this.value = this.initialValue;
    }
  }

  public showList() {
    this.show = !this.show;
  }

  public changeValue(value: any) {
    this.value = value;
    this.showList();
    this.newValue.emit(value.value);
  }

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (this.show && !this.content.nativeElement.contains(event.target)) {
      this.showList();
    }
  }
}
