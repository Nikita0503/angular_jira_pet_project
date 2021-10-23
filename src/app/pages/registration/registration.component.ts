import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  matcher = new PasswordsErrorStateMatcher();
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,
      private authService: AuthService,
      private snackBar: MatSnackBar) {
      this.registrationForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
      }, {validators: samePasswordsValidator});
    }



    get isDisabledRegistration() {
      return this.registrationForm.invalid
    }

    get isInvalidPasswords() {
      let isInvalid: boolean = false
      if(!this.registrationForm.get('password')?.invalid
       && !this.registrationForm.get('repeatPassword')?.invalid){
        if(this.registrationForm.get('password')?.value != this.registrationForm.get('repeatPassword')?.value){
          isInvalid = true;
        }
       }
       return isInvalid;
    }

    registration(){

    }
}

class PasswordsErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    let isInvalid: boolean = false;
    //!!control?.parent?.hasError('notSame')

    return !!control?.parent?.hasError('notSame') && !!control?.parent?.get('repeatPassword')?.value;
  }
}

const samePasswordsValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const repeatPassword = group.get('repeatPassword')?.value;
  console.log(password == repeatPassword ? null : { notSame: true })
  return password == repeatPassword ? null : { notSame: true }
};
