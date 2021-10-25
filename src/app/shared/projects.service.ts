import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface User {
  id: number,
  name: string,
  email: string,
  role: string,
  avatar: string
}

export interface Project {
  id: number,
  title: string,
  description: string,
  tasksCount: number,
  users: User[],
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects: Project[];

  constructor(private httpClient: HttpClient) {
    this.projects = [];
  }

  fetchAllProjects(){
    this.httpClient.get<any>(environment.apiUrl + 'projects/')
      .subscribe({
        next: (response: any) => {
          this.projects = response.projects;
          console.log(response)
        }
      })
  }

}
