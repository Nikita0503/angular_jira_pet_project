import { User } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from './projects.service';
import { map, switchMap } from 'rxjs/operators';
import { MatSelectionListChange } from '@angular/material/list';

@Injectable({
  providedIn: 'root'
})
export class RegisterProjectService {

  newProject?: Project;
  allUsers: User[];

  constructor(private httpClient: HttpClient) {
    this.allUsers = [];
  }

  checkExistsProject(title: string): Observable<boolean>{
    return this.httpClient.post<boolean>(environment.apiUrl + 'projects/exists', {
      title
    })
  }

  createNewProject(title: string, description: string){
    this.httpClient.post<any>(environment.apiUrl + 'projects', {
      title,
      description
    }).pipe(switchMap(response => {
        this.newProject = response.project;
        return this.fetchUsers()
      })).subscribe()
  }

  fetchUsers(): Observable<any>{
    return this.httpClient.get<any>(environment.apiUrl + `users`)
      .pipe(map(response => {
        this.allUsers = response.users;
      })
    )
  }
}
