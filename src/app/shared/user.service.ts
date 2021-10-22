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

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  fetchCurrentUser(){
    const headers = new HttpHeaders({ //TODO: make interceptors
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.authService.token}`,
});
    this.httpClient.post<User>(environment.apiUrl + 'users/me/', null, {
      headers: headers})
      .subscribe({
        next: (response: any) => {
          this.user = response.user;
          console.log("USER => ", this.user);
        },
        error: (e) => {
          console.log("fetchCurrentUser => ", e)
        }
      })
  }
}
