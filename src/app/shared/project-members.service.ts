import { HttpClient } from '@angular/common/http';
import { User } from './user.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectMembersService {

  allUsers: User[];
  projectMembers: User[];

  constructor(private httpClient: HttpClient) {
    this.allUsers = [];
    this.projectMembers = [];
  }

  fetchAllUsers(){
    this.httpClient.get<any>(environment.apiUrl + 'users')
      .subscribe({
        next: (response: any) => {
          this.allUsers = response.users;
        }
      })
  }

  fetchProjectMembers(projectId: number){
    this.httpClient.get<any>(environment.apiUrl + `/projects/${projectId}/users`)
      .subscribe({
        next: (response: any) => {
          this.projectMembers = response.users;
        }
      })
  }
}
