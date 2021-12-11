import { Attachment } from './../pages/create-task/create-task.component';
import { User } from './projects.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Status } from './statuses.service';
import { Type } from './types.service';

@Injectable({
  providedIn: 'root'
})
export class CreateTaskService {

  constructor(private httpClient: HttpClient) {

  }

  createNewTask(projectId: number,
    title: string,
    description: string,
    type: Type,
    status: Status,
    user: User,
    attachments: Attachment[],
    hours: number,
    minutes: number,
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
    let timeAllotted = this.getTimeAllotted(hours, minutes);
    if(timeAllotted > 0){
      formData.append('timeAllotted', timeAllotted.toString());
    }
    this.httpClient.post<any>(environment.apiUrl + `projects/${projectId}/tasks`, formData)
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

  getTimeAllotted(hours: number, minutes: number): number{
    let timeAlloted = 0;
    if(!!hours){
      timeAlloted += hours * 60
    }
    if(!!minutes){
      timeAlloted += minutes;
    }
    return timeAlloted;
  }

}
