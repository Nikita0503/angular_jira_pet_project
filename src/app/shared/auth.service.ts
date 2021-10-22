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

  constructor(private httpClient: HttpClient,
    private commonService: CommonService) { }

  login(credentials: UserCredentials, onSuccess: Function, onFailure: Function){
    this.commonService.setIsLoading(true)
    this.httpClient.post<any>(environment.apiUrl + 'users/login/', credentials)
      .subscribe({
        next: (response: any) => {
          this.token = response.token;
          this.commonService.setIsLoading(false)
          onSuccess();
        },
        error: (e) => {
          this.commonService.setIsLoading(false)
          onFailure(e.error.message);
        }
      })
  }
}
