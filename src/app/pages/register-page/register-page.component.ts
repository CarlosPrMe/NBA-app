import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';
import { customValidatorEmail } from '../../models/customValidators';
import { customValidatorUrl } from '../../models/customValidators';
import { UserModel } from '../../models/user.model';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {

  public registered: boolean;
  public myForm: FormGroup;
  public minLengthName: number;
  public minLengthPass: number;
  public user: UserModel;
  constructor(private _fb: FormBuilder, private _userService: UserService, private router: Router, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.registered = true;
    this.minLengthName = 5;
    this.minLengthPass = 4;
    this.myForm = this._fb.group({
      email: ['', Validators.compose([Validators.required, customValidatorEmail])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(this.minLengthPass)])]
    });
  }

  createForm(user) {
    if (!user) {
      this.myForm = this._fb.group({
        name: ['', Validators.compose([Validators.required, Validators.minLength(this.minLengthName)])],
        sur_name: ['', Validators.required],
        avatar: ['', Validators.compose([customValidatorUrl])],
        email: ['', Validators.compose([Validators.required, customValidatorEmail])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(this.minLengthPass)])],
        terms: ['', Validators.requiredTrue]
      })
    } else {
      this.myForm = this._fb.group({
        email: ['', Validators.compose([Validators.required, customValidatorEmail])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(this.minLengthPass)])]
      })
    }
  }

  register() {
    this.registered = !this.registered;
    this.createForm(this.registered);
  }

  submit(form) {
    this.spinnerService.changeSpinnerState();
    setTimeout(() => {
      if (form.valid) {
        this.user = { ...form.value }
        this._userService.addUser(this.user).subscribe((res): any => {
          this.spinnerService.changeSpinnerState();
          if (res._id) {
            this.router.navigate(['/home']);
          } else {
            this.myForm.reset();
            alert('Hubo un error al regstrar usuario');
          }
        })
      }
    }, 1000);
  }

  login(event, form) {
    this.spinnerService.changeSpinnerState();
    if (form.valid) {
      setTimeout(() => {
        this._userService.getUSer(form.value).subscribe(res => {
          this._userService.user.next(res);
          // this.spinnerService.changeSpinnerState();
          this.router.navigate(['/home']);
        })
      }, 2000);
    }
  }
}
