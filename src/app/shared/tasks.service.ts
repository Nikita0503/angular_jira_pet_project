import { HttpClient } from '@angular/common/http';
import { Status } from './statuses.service';
import { User } from './user.service';
import { Injectable } from '@angular/core';
import { Type } from './types.service';
import { environment } from 'src/environments/environment';

export interface File {
  id: number,
  name: string
}

export interface Task {
  id: number,
  title: string,
  description?: string,
  timeTracked?: number,
  timeAllotted?: number,
  status: Status
  type: Type,
  user?: User,
  files?: File[]
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[];

  constructor(private httpClient: HttpClient,
    ) {
    this.tasks = [];
  }

  fetchAllTasks(projectId: number){
    this.httpClient.get<any>(environment.apiUrl + `projects/${projectId}/tasks`)
      .subscribe({
        next: (response: any) => {
          this.tasks = response.tasks;
        }
      })
  }

  deleteTask(projectId: number, taskId: number, onSuccess: Function){
    this.httpClient.delete<any>(environment.apiUrl + `projects/${projectId}/tasks/${taskId}`)
      .subscribe({
        next: (response: any) => {
          if(response.deleted){
            this.tasks = this.tasks.filter((task: Task) => task.id != taskId);
            onSuccess();
          }
        }
      })
  }
}
