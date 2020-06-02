import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';
import { customValidatorEmail } from '../../models/customValidators';
import { customValidatorUrl } from '../../models/customValidators';
import { customValidatorImage } from '../../models/customValidators';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {

  public registered: boolean;
  public edition: boolean;
  public myForm: FormGroup;
  public minLengthName: number;
  public minLengthPass: number;
  public user: UserModel;
  constructor(private _fb: FormBuilder, private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.registered = true;
    this.edition = false;
    this.minLengthName = 5;
    this.minLengthPass = 4;
    this.myForm = this._fb.group({
      email: ['', Validators.compose([Validators.required, customValidatorEmail])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(this.minLengthPass)])]
    });
    this._userService.user.subscribe(res => {
      if (res && res._id) {
        this.user = res;
        this.edition = true;
        this.register();
      } else {
        this.registered = true;
      }
    })
  }


  public register() {
    this.registered = !this.registered;
    this._createForm(this.registered, this.edition);
  }

  public submit(form) {
    if (form.valid) {
      if (this.edition) {
        let newUser = { ...this.user, ...form.value };
        this._userService.modifiUser(newUser).subscribe(res => {
          this._userService.user.next(res);
          this._router.navigate(['/home']);
        })
      } else {
        let user = { ...form.value };
        this._userService.addUser(user).subscribe((res): any => {
          if (res._id) {
            alert(`Bienvenido a la aplicación ${user.name}`);
            this._userService.user.next(user);
            this._router.navigate(['/home']);
          } else {
            this.myForm.reset();
            alert('Hubo un error al registrar usuario');
          }
        })
      }
    }
  }

  public login(event, form) {
    if (form.valid) {
      this._userService.getUSer(form.value).subscribe(res => {
        this._userService.user.next(res);
        this._router.navigate(['/home']);
      }, err => {
        alert('Hubo un error en el login. Intenta de nuevo');
        this._resetForm()
      }
      )
    }
  }

  public deleteUser(user) {
    let confirmation: boolean = confirm('¿Seguro que quieres eliminar la cuenta?');
    if (confirmation) {
      this._userService.deleteUser(user._id).subscribe((res: any) => {
        if (res._id) {
          this._userService.user.next(null);
          alert('Cuenta eliminada con éxito')
        } else {
          alert('Error al eliminar la cuenta');
        }
        this._router.navigate(['/home']);
      })
    }
  }

  public removeFocus(event){
    event.target.blur();
  }

  private _createForm(user, edition) {

    if (edition) {
      this.myForm = this._fb.group({
        name: [this.user.name, Validators.compose([Validators.required, Validators.minLength(this.minLengthName)])],
        sur_name: [this.user.sur_name, Validators.required],
        avatar: [this.user.avatar, Validators.compose([customValidatorUrl, customValidatorImage])],
        email: [this.user.email, Validators.compose([Validators.required, customValidatorEmail])],
        password: [this.user.password, Validators.compose([Validators.required, Validators.minLength(this.minLengthPass)])],
        terms: [this.user.terms, Validators.requiredTrue]
      })
    } else {
      if (!user) {
        this.myForm = this._fb.group({
          name: ['', Validators.compose([Validators.required, Validators.minLength(this.minLengthName)])],
          sur_name: ['', Validators.required],
          avatar: ['', Validators.compose([customValidatorUrl, customValidatorImage])],
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
  }

  private _resetForm() {
    this.myForm.get('email').setValue('');
    this.myForm.get('password').setValue('');
  }
}
