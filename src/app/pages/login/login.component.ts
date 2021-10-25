import { CommonService } from './../../shared/common.service';
import { AuthService, UserCredentials } from './../../shared/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder,
      private authService: AuthService,
      private commonService: CommonService,
      private router: Router) {
      this.loginForm = this.fb.group({
        email: ['mail_2@gmail.com', [Validators.required, Validators.email]],
        password: ['qwerty', [Validators.required, Validators.minLength(6)]]
      });
    }

    get isDisabledLogin() {
      return this.loginForm.invalid
    }

    login(){
      const creadentials: UserCredentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.authService.login(creadentials,
          () => {
            this.router.navigate(['/projects']);
          },
          (errorMessage: string) => {
            this.commonService.showSnakeMessage(errorMessage);
          });
    }
}
