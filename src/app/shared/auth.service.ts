import { CommonService } from './common.service';
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
}
