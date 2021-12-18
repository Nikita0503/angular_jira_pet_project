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
    this.tasks = [{
      id: 1,
      title: 'task',
      status: {
        id: 1,
        title: 'qwe',
        color: '#F0F0F0'
      },
      type: {
        id: 1,
        title: 'asd',
        color: '#F0F0F0'
      },
      user: {
        id: 1,
        email: 'qwe@qwe.com',
        name: 'name',
        role: 'USER',
        avatar: ''
      }
    }];
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
