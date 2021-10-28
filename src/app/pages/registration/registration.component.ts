import { RegistrationData } from './../../shared/user.service';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  url?: string;
  avatar: File = new File([], '');
  registrationData?: RegistrationData;
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
          role: ['', [Validators.required]]
      }, {validators: samePasswordsValidator});
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

    get imageUrl(){
      return this.url
    }

    onImageChange(event: any){
      this.avatar = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.onerror = (event: any) => {
        console.log("File could not be read: " + event.target.error.code);
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    registration(){
      this.registrationData = {
        email: this.registrationForm.get('email')?.value,
        name: this.registrationForm.get('name')?.value,
        password: this.registrationForm.get('password')?.value,
        role: this.registrationForm.get('role')?.value,
        avatar: this.avatar
      }
      this.authService.registration(this.registrationData)
    }
}

class PasswordsErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!control?.parent?.hasError('notSame') && !!control?.parent?.get('repeatPassword')?.value;
  }
}

const samePasswordsValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const repeatPassword = group.get('repeatPassword')?.value;
  return password == repeatPassword ? null : { notSame: true }
};
