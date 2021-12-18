import { MatDialog } from '@angular/material/dialog';
import { ImageComponent } from './../dialogs/image/image.component';
import { UserService } from './../../shared/user.service';
import { CommonService } from './../../shared/common.service';
import { Comment, CommentsService } from './../../shared/comments.service';
import { Attachment } from './../../pages/create-task/create-task.component';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { File } from 'src/app/shared/tasks.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() projectId?: number;
  @Input() taskId?: number;
  message: string;
  attachments: Attachment[];

  constructor(private commentsService: CommentsService,
    public dialog: MatDialog,
    private commonService: CommonService,
    private userService: UserService) {
    this.attachments = [];
    this.message = "";
  }

  ngOnInit(): void {
    console.log('projectId', this.projectId)
    console.log('taskId', this.taskId)
    this.commentsService.fetchComments(this.projectId!, this.taskId!);
  }

  ngOnDestroy(): void {
    this.message = "";
    this.commentsService.clearCommentList();
  }

  onPickFile(event: any){
    var reader = new FileReader();
    reader.onload = (file: any) => {
      this.attachments.push({
        url: file.target.result,
        file: event.target.files[0]
      })
      console.log({
        url: file.target.result,
        file: event.target.files[0]
      })
    };
    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  deleteFile(attachment: Attachment){
    this.attachments = this.attachments.filter((item: Attachment) => item.url !== attachment.url)
  }

  sendComment(){
    this.commentsService.sendComment(this.projectId!,
      this.taskId!,
      this.message!,
      this.attachments,
      () => {
        this.message = '';
        this.attachments = [];
        this.commonService.showSnakeMessage("Comment successfully created");
      });
  }

  deleteComment(comment: Comment){
    this.commentsService.deleteComment(this.projectId!,
      this.taskId!,
      comment.id,
      () => {
        this.commonService.showSnakeMessage("Comment successfully deleted");
      });
  }

  get apiUrl(){
    return environment.baseUrl;
  }

  get isValid(){
    return !this.message
  }

  get comments(){
    return this.commentsService.comments;
  }

  isDeletable(comment: Comment){
    return this.userService.user?.id === comment.user.id
  }

  openFile(file: File){
    let dialogRef = this.dialog.open(ImageComponent, {
      data: environment.baseUrl + file.name
    });
    dialogRef.afterClosed().subscribe();
  }
}
