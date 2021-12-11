import { User } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[];

  constructor(private httpClient: HttpClient) {
    this.users = []
  }

  fetchUsers(){
    this.httpClient.get<any>(environment.apiUrl + `users`)
    .subscribe({
      next: (response: any) => {
        this.users = response.users;
      }
    })
  }

  getUserByName(name: string): User | undefined{
    return this.users.find((user: User) => user.name === name)
  }
}
