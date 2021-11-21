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
  updatedAt: string
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
        }
      })
  }

  deleteProject(id: number){
    this.httpClient.delete<any>(environment.apiUrl + `projects/${id}/`)
      .subscribe({
        next: (response: any) => { //TODO: refactor for finding by index, not filter!
          if(response.deleted){
            this.projects = this.projects.filter((project: Project) => project.id != id);
          }
        }
      })
  }

  editProject(editedProject: Project, onSuccess: Function, onFailure: Function){
    this.httpClient.put<any>(environment.apiUrl + `projects/${editedProject.id}`, editedProject)
      .subscribe({
        next: (response: any) => {
          this.projects = this.projects.map((project: Project) => {
            if(project.id == response.project.id){
              return response.project
            }
            return project;
          });
          onSuccess(`Project '${editedProject.title} has been updated!'`)
        },
        error: (e) => {
          onFailure(e.error.message)
        }
      })
  }

}
