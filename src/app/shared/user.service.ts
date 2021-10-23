import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface User {
  id: number,
  name: string,
  email: string,
  role: string,
  avatar: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?: User;

  constructor(private httpClient: HttpClient) { }

  fetchCurrentUser(){
    this.httpClient.post<any>(environment.apiUrl + 'users/me/', null)
      .subscribe((response: any) => {
          this.user = response.user;
          console.log("USER => ", this.user);
      })
  }
}
