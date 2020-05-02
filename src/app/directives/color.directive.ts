import { Directive, Input, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[colorTxt]'
})
export class ColorDirective implements OnInit {

  @Input('colorTxt') color: string;
  public element: any;
  constructor(el: ElementRef) {
    {
      this.element = el.nativeElement;
    }
  }

  ngOnInit() {
    this.element.style.color = `rgb(${this.color})`;
  }
}
