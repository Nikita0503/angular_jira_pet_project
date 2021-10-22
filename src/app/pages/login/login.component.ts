import { AuthService, UserCredentials } from './../../shared/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    isLoading: boolean = false;
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    get _disabledLogin() {
      return this.loginForm.get('email')?.invalid
        || this.loginForm.get('password')?.invalid
    }

    login(){
      const creadentials: UserCredentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.authService.login(creadentials).subscribe(
      () => console.log('DONE'),
      (error) => console.log('ERROR', error));
    }
}
