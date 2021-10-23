import { UserService } from './../../shared/user.service';
import { AuthService, UserCredentials } from './../../shared/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder,
      private authService: AuthService,
      private userService: UserService,
      private snackBar: MatSnackBar) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    get isDisabledLogin() {
      return this.loginForm.get('email')?.invalid
        || this.loginForm.get('password')?.invalid
    }

    login(){
      const creadentials: UserCredentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.authService.login(creadentials,
          () => {
            this.userService.fetchCurrentUser();
          },
          (errorMessage: string) => {
            this.snackBar.open(errorMessage, "OK", {duration: 2000})
          });
    }
}
