import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        email: ['', Validators.email],
        password: ['', Validators.minLength(6)]
      });
    }

    login(){
      console.log(this.loginForm.get('email')?.value)
    }

    get _invalidEmail() {
      return this.loginForm.get('email')?.invalid
    }

    get _invalidPassword() {
      return this.loginForm.get('password')?.invalid
    }

    get _disabledLogin() {
      return this._invalidEmail || this._invalidPassword;
    }
}
