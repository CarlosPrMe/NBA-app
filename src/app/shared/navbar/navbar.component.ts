import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user: UserModel;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user.subscribe((res:UserModel) =>{
      if(res){
        this.user = res;
      }else{
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

  onCloseSessionUser(event){
    console.log('DEsde el navbar', event);
  }
}
