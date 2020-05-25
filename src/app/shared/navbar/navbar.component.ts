import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { UserModel } from 'src/app/models/user.model';
import { SearcherService } from 'src/app/services/searcher.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user: UserModel;
  public searcherOpen: boolean;
  constructor(private userService: UserService, private searcherService: SearcherService) { }

  ngOnInit(): void {
    this.searcherService.searcherShow.subscribe(res=> {
      this.searcherOpen = res;
    })

    this.userService.user.subscribe((res: UserModel) => {
      if (res) {
        this.user = res;
      } else {
        // this.user = {
        //   name: "Perico",
        //   sur_name: "Perez",
        //   email: 'nada@gmail.com',
        //   terms: true,
        //   password: '1234',
        //   avatar:"https://lh3.googleusercontent.com/-d-cldq0iIFQ/WpakxI3OXoI/AAAAAAAAOs0/v7lpT9KuFvMWyYUlcFBvonmUTFcfkbFhACHMYCw/avatar-santi%255B2%255D?imgmax=800"
        // }
      }
    })
  }

  onCloseSessionUser(event) {
    console.log('DEsde el navbar', event);
  }

  showSearcher($event) {
    this.searcherService.searcherShow.next(!this.searcherOpen)
  }
}
