import { RegistrationData } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface UserCredentials {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token?: string;

  constructor(private httpClient: HttpClient) { }

  login(credentials: UserCredentials, onSuccess: Function, onFailure: Function){
    this.httpClient.post<any>(environment.apiUrl + 'users/login/', credentials)
      .subscribe({
        next: (response: any) => {
          this.token = response.token;
          onSuccess();
        },
        error: (e) => {
          onFailure(e.error.message);
        }
      })
  }

  registration(registrationData: RegistrationData){
    const formData: FormData = new FormData();
    formData.append('email', registrationData.email)
    formData.append('password', registrationData.password)
    formData.append('name', registrationData.name)
    formData.append('role', registrationData.role)
    formData.append('avatar', new Blob([registrationData.avatar], { type: 'image/png' }), registrationData.avatar.name);
    this.httpClient.post<any>(environment.apiUrl + 'users/registration/', formData)
    .subscribe({
      next: (response: any) => {
        console.log("RESPONSE", response)
      },
      error: (e) => {
        console.log("ERROR", e)

      }
    })
  }
}

