import { HttpClient } from '@angular/common/http';
import { Attachment } from './../pages/create-task/create-task.component';
import { File } from 'src/app/shared/tasks.service';
import { User } from './user.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Comment {
  id: number;
  message: string;
  user: User;
  files: File[],
  createdAt: Date
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments: Comment[];

  constructor(private httpClient: HttpClient) {
    this.comments = [];
  }

  fetchComments(projectId: number,
    taskId: number){
      this.httpClient.get<any>(environment.apiUrl + `projects/${projectId}/tasks/${taskId}/comments`)
      .subscribe({
        next: (response: any) => {
          this.comments = response.comments;
        },
        error: (e) => {
          console.log("ERROR", e)
        }
      })
    }

  sendComment(projectId: number,
    taskId: number,
    message: string,
    files: Attachment[],
    onSuccess: Function){
      const formData: FormData = new FormData();
      formData.append('message', message)
      for(let i = 0; i < files.length; i++){
        formData.append('file', new Blob([files[i].file], { type: 'image/png' }), files[i].file.name)
      }
      this.httpClient.post<any>(environment.apiUrl + `projects/${projectId}/tasks/${taskId}/comments`, formData)
      .subscribe({
        next: (response: any) => {
          console.log("RESPONSE", response)
          onSuccess();
          this.fetchComments(projectId, taskId);
        },
        error: (e) => {
          console.log("ERROR", e)
        }
      })
  }

  deleteComment(projectId: number,
    taskId: number,
    commentId: number,
    onSuccess: Function){
      this.httpClient.delete<any>(environment.apiUrl + `projects/${projectId}/tasks/${taskId}/comments/${commentId}`)
      .subscribe({
        next: (response: any) => {
          console.log("RESPONSE", response)
          onSuccess();
          this.fetchComments(projectId, taskId);
        },
        error: (e) => {
          console.log("ERROR", e)
        }
      })
    }

  clearCommentList(){
    this.comments = [];
  }
}
