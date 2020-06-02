import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { UserModel } from 'src/app/models/user.model';
import { SearcherService } from 'src/app/services/searcher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user: UserModel;
  public searcherOpen: boolean;
  constructor(private _userService: UserService, private _searcherService: SearcherService, private _router: Router) { }

  ngOnInit(): void {
    this._searcherService.searcherShow.subscribe(res => {
      this.searcherOpen = res;
    })

    this._userService.user.subscribe((res: UserModel) => {
      this.user = res;
    })
  }

  onCloseSessionUser(event) {
    this._userService.closeSesion() ? this._router.navigate(['/home']) : null;
  }

  showSearcher(event) {
    this._searcherService.searcherShow.next(!this.searcherOpen);
  }
}
