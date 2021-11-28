import { CommonService } from './common.service';
import { User } from './user.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project, ProjectsService } from './projects.service';
import { map, switchMap } from 'rxjs/operators';
import { MatSelectionListChange } from '@angular/material/list';

@Injectable({
  providedIn: 'root'
})
export class RegisterProjectService {

  newProject?: Project;
  allUsers: User[];
  selectedUsers: User[];

  constructor(private httpClient: HttpClient,
    private projectService: ProjectsService,
    private commonService: CommonService) {
    this.allUsers = [];
    this.selectedUsers = [];
  }

  checkExistsProject(title: string): Observable<boolean>{
    return this.httpClient.post<boolean>(environment.apiUrl + 'projects/exists', {
      title
    })
  }

  createNewProject(title: string, description: string, callback?: Function){
    this.httpClient.post<any>(environment.apiUrl + 'projects', {
      title,
      description
    }).pipe(switchMap(response => {
        this.newProject = response.project;
        if(!!callback){
          callback();
        }
        this.updateProjects();
        return this.fetchUsers()
      })).subscribe()
  }

  changeUserStatus(selectedUser: User){
    const index = this.selectedUsers.findIndex((user: User) => selectedUser.id == user.id);
    if(index > -1){
      this.selectedUsers.splice(index, 1)
    }else{
      this.selectedUsers.push(selectedUser)
    }
  }

  addUsersToProject(callback?: Function){
    if(this.selectedUsers.length == 0){
      this.commonService.showSnakeMessage("You must select at least 1 member")
      return
    }
    const requests: Observable<any>[] = [];
    for(var i = 0; i < this.selectedUsers.length; i++){
       requests.push(this.httpClient.post<any>(environment.apiUrl + `projects/${this.newProject?.id}/users`, {
          userId: this.selectedUsers[i].id
        }))
    }
    forkJoin(requests)
      .subscribe((result: any) => {
        this.updateProjects();
        if(!!callback){
          callback();
        }
      })
  }

  updateProjects(){
    this.projectService.fetchAllProjects();
  }

  fetchUsers(): Observable<any>{
    return this.httpClient.get<any>(environment.apiUrl + `users`)
      .pipe(map(response => {
        this.allUsers = response.users;
      })
    )
  }
}
