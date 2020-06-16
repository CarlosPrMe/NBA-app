import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked, HostListener } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewChecked {

  @Input() user: UserModel;
  @Output() closeSessionUser = new EventEmitter<any>();
  @ViewChild('menu') menu:ElementRef;
  public showMenu: boolean;
  private _content
  constructor() { }

  ngOnInit(): void {
    this.showMenu = false;
  }

  ngAfterViewChecked(){
    if(this.menu?.nativeElement){
      this._content = this.menu.nativeElement;
    }
  }

  public closeSession(event) {
    event.preventDefault();
    this.closeSessionUser.emit(true);
    this.changeStateMenu();
  }

  public goTo(event, link) {
    event.preventDefault();
    console.log(link);
  }

  public changeStateMenu() {
    if (window.screen.width < 1199) {
      this.showMenu = !this.showMenu;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.showMenu && !this._content.contains(event.target)) { 
      this.changeStateMenu();
    }
  }

}
