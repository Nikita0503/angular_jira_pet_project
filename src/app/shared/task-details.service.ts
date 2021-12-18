import { Injectable } from '@angular/core';
import { Task, TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {

  task?: Task;

  constructor(private taskService: TasksService) { }

  fetchTaskById(taskId: number){
    this.taskService.tasks.forEach((item: Task) => {
      if(taskId == item.id){
        this.task = item;
      }
    })
  }
}
