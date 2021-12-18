import { Attachment } from './../create-task/create-task.component';
import { ImageComponent } from './../../components/dialogs/image/image.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsService } from './../../shared/task-details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { File } from 'src/app/shared/tasks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  projectId?: number;
  taskId?: number;

  constructor(private route: ActivatedRoute,
    private taskDetailsService: TaskDetailsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.taskDetailsService.fetchTaskById(params.taskId);
        this.projectId = params.projectId;
        this.taskId = params.taskId;
      }
    );
  }

  get task(){
    return this.taskDetailsService.task;
  }

  get apiUrl(){
    return environment.baseUrl;
  }

  get timeTracked(){
    return this.taskDetailsService.task?.timeTracked
  }

  get progress(){
    let tracked = this.taskDetailsService.task?.timeTracked ?? 0;
    let allotted = this.taskDetailsService.task?.timeAllotted ?? 1
    return  100 * tracked / allotted
  }

  openFile(file: File){
    let dialogRef = this.dialog.open(ImageComponent, {
      data: environment.baseUrl + file.name
    });
    dialogRef.afterClosed().subscribe();
  }

}
