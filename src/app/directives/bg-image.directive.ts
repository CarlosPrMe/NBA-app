import { Directive, ElementRef, Input, OnChanges, SimpleChanges, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appBgImage]'
})
export class BgImageDirective implements OnChanges, OnInit {

  @Input('appBgImage') source: String;
  private element: any;
  private shadowDefault: string;
  private teamColor: string;
  constructor(el: ElementRef) {
    {
      this.element = el.nativeElement;
    }
  }

  ngOnInit() {
    this.shadowDefault = 'inset 0 0 1rem rgba(0,0,0,.4)';
  }
  ngOnChanges(change: SimpleChanges) {
    this.element.style.backgroundImage = `url('${change.source.currentValue[0]}')`
    this.teamColor = change.source.currentValue[1];
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.element.style.boxShadow = `inset 0 0 1rem rgba(${this.teamColor}, 0.9)`;
    this.element.style.borderColor = `rgb(${this.teamColor})`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.style.boxShadow = this.shadowDefault;
    this.element.style.borderColor = 'rgba(0,0,0,.5)';
  }
}