import { CommonService } from './common.service';
import { Attachment } from './../pages/create-task/create-task.component';
import { User } from './projects.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Status } from './statuses.service';
import { Type } from './types.service';
import { Task, TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class EditTaskService {

  task?: Task;

  constructor(private httpClient: HttpClient,
    private taskService: TasksService,
    private commonService: CommonService) {

  }

  fetchTaskById(taskId: number){
    this.taskService.tasks.forEach((item: Task) => {
      if(taskId == item.id){
        this.task = item;
      }
    })
  }

  editTask(projectId: number,
    taskId: number,
    title: string,
    description: string,
    type: Type,
    status: Status,
    user: User,
    attachments: Attachment[],
    toBeDeletedOldAttachments: number[],
    hoursAllotted: number,
    minutesAllotted: number,
    hoursTracked: number,
    minutesTracked: number,
    onSuccess: Function){
    const formData: FormData = new FormData();
    formData.append('title', title)
    formData.append('description', description)
    formData.append('typeId', type.id.toString())
    formData.append('statusId', status.id.toString())
    formData.append('userId', user.id.toString())
    for(let i = 0; i < attachments.length; i++){
      formData.append('file', new Blob([attachments[i].file], { type: 'image/png' }), attachments[i].file.name);
    }
    let timeAllotted = this.getTime(hoursAllotted, minutesAllotted);
    let timeTracked = this.getTime(hoursTracked, minutesTracked);
    if(timeAllotted < timeTracked){
      this.commonService.showSnakeMessage('Incorrect time');
      return
    }
    formData.append('timeAllotted', timeAllotted.toString());
    formData.append('timeTracked', timeTracked.toString());

    for(let i = 0; i < toBeDeletedOldAttachments.length; i++){
      this.httpClient.delete<any>(environment.apiUrl + `files/${toBeDeletedOldAttachments[i]}`).subscribe()
    }

    this.httpClient.put<any>(environment.apiUrl + `projects/${projectId}/tasks/${taskId}`, formData)
    .subscribe({
      next: (response: any) => {
        console.log("RESPONSE", response)
        if(onSuccess){
          onSuccess();
        }
      },
      error: (e) => {
        console.log("ERROR", e)
      }
    })
  }

  getTime(hours: number, minutes: number): number{
    let timeAlloted = 0;
    if(!!hours){
      timeAlloted += hours * 60
    }
    if(!!minutes){
      timeAlloted += minutes;
    }
    return timeAlloted;
  }

  getHours(time: number){
    return Math.floor(time / 60)
  }

  getMinutes(time: number){
    return time % 60
  }
}
