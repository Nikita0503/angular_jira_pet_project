import { UsersService } from './../../shared/users.service';
import { StatusesService } from './../../shared/statuses.service';
import { TypesService } from './../../shared/types.service';
import { Attachment } from './../create-task/create-task.component';
import { EditTaskService } from './../../shared/edit-task.service';
import { CommonService } from './../../shared/common.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { File } from 'src/app/shared/tasks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  taskId?: number;
  projectId?: number;
  editingForm: FormGroup;
  newAttachments: Attachment[];
  oldAttachments?: File[];
  toBeDeletedOldAttachments: number[];

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private location: Location,
    private editTaskService: EditTaskService,
    private typesService: TypesService,
    private statusesService: StatusesService,
    private usersService: UsersService) {
      this.editingForm = this.fb.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        type: ['', [Validators.required]],
        status: ['', [Validators.required]],
        user: ['', [Validators.required]],
        hoursAllotted: ['', [Validators.min(0)]],
        minutesAllotted: ['', [Validators.min(0), Validators.max(60)]],
        hoursTracked: ['', [Validators.min(0)]],
        minutesTracked: ['', [Validators.min(0), Validators.max(60)]]
      });
      typesService.fetchTypes();
      statusesService.fetchStatuses();
      usersService.fetchUsers();
      this.newAttachments = [];
      this.oldAttachments = [];
      this.toBeDeletedOldAttachments = [];
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.projectId = params.projectId
        this.taskId = params.taskId
        this.fetchCurrentTaskData(this.taskId!)
      }
    );
  }

  fetchCurrentTaskData(taskId: number){
    this.editTaskService.fetchTaskById(taskId);
    this.editingForm.get('title')?.setValue(this.editTaskService.task!.title);
    this.editingForm.get('description')?.setValue(this.editTaskService.task!.description);
    this.editingForm.get('type')?.setValue(this.editTaskService.task!.type.title);
    this.editingForm.get('status')?.setValue(this.editTaskService.task!.status.title);
    this.editingForm.get('user')?.setValue(this.editTaskService.task!.user?.name);
    this.editingForm.get('hoursAllotted')?.setValue(this.editTaskService.getHours(this.editTaskService.task!.timeAllotted!));
    this.editingForm.get('minutesAllotted')?.setValue(this.editTaskService.getMinutes(this.editTaskService.task!.timeAllotted!));
    this.editingForm.get('hoursTracked')?.setValue(this.editTaskService.getHours(this.editTaskService.task!.timeTracked!));
    this.editingForm.get('minutesTracked')?.setValue(this.editTaskService.getMinutes(this.editTaskService.task!.timeTracked!));
    this.oldAttachments = this.editTaskService.task?.files;
  }

  get apiUrl(){
    return environment.baseUrl;
  }

  get statuses(){
    return this.statusesService.statuses;
  }

  get types(){
    return this.typesService.types;
  }

  get users(){
    return this.usersService.users;
  }

  changeDescription(event: any){
    const description = event.target.value;
    this.editingForm.get('description')?.setValue(description);
  }

  onPickFile(event: any){
    var reader = new FileReader();
    reader.onload = (file: any) => {
      this.newAttachments.push({
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
    this.newAttachments = this.newAttachments.filter((item: Attachment) => item.url !== attachment.url)
  }

  deleteOldAttachment(file: File){
    this.toBeDeletedOldAttachments.push(file.id);
    this.oldAttachments = this.oldAttachments?.filter((item: File) => item.id !== file.id)
  }

  goToPreviousPage(){
    this.location.back();
  }

  editTask(){
    const title = this.editingForm.get('title')?.value
    const description = this.editingForm.get('description')?.value
    const type = this.typesService.getTypeByTitle(this.editingForm.get('type')?.value)
    const status = this.statusesService.getStatusByTitle(this.editingForm.get('status')?.value)
    const user = this.usersService.getUserByName(this.editingForm.get('user')?.value)
    const hoursAllotted = this.editingForm.get('hoursAllotted')?.value
    const minutesAllotted = this.editingForm.get('minutesAllotted')?.value
    const hoursTracked = this.editingForm.get('hoursTracked')?.value
    const minutesTracked = this.editingForm.get('minutesTracked')?.value
    this.editTaskService.editTask(this.projectId!,
      this.taskId!,
      title,
      description,
      type!,
      status!,
      user!,
      this.newAttachments,
      this.toBeDeletedOldAttachments,
      hoursAllotted,
      minutesAllotted,
      hoursTracked,
      minutesTracked,
      () => {
        this.location.back();
        this.commonService.showSnakeMessage("Task successfully updated");
      })
  }
}
