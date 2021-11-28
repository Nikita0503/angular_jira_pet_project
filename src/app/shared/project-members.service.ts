import { ProjectsService } from './projects.service';
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

  constructor(private httpClient: HttpClient, private projectsService: ProjectsService) {
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
    this.httpClient.get<any>(environment.apiUrl + `projects/${projectId}/users`)
      .subscribe({
        next: (response: any) => {
          this.projectMembers = response.users;
        }
      })
  }

  addUserToProject(projectId: number, selectedUser: User){
    this.httpClient.post<any>(environment.apiUrl + `projects/${projectId}/users`, {
      userId: selectedUser.id
    })
      .subscribe({
        next: (response: any) => {
          this.fetchProjectMembers(projectId);
          this.projectsService.fetchAllProjects();
        }
      })
  }

  removeUserFromProject(projectId: number, selectedUser: User){
    this.httpClient.delete<any>(environment.apiUrl + `projects/${projectId}/users`, {
      body: {
        userId: selectedUser.id
      }
    })
      .subscribe({
        next: (response: any) => {
          this.fetchProjectMembers(projectId);
          this.projectsService.fetchAllProjects();
        }
      })
  }
}
