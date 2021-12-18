import { CommonService } from './../../shared/common.service';
import { CreateTaskService } from './../../shared/create-task.service';
import { UsersService } from './../../shared/users.service';
import { StatusesService } from './../../shared/statuses.service';
import { TypesService } from './../../shared/types.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

export interface Attachment {
  url:string,
  file: File,
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  projectId?: number;
  creatingForm: FormGroup;
  attachments: Attachment[];

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private location: Location,
    private createTaskService: CreateTaskService,
    private typesService: TypesService,
    private statusesService: StatusesService,
    private usersService: UsersService) {
      this.creatingForm = this.fb.group({
        title: ['', [Validators.required]],
        description: '',
        type: ['', [Validators.required]],
        status: ['', [Validators.required]],
        user: ['', [Validators.required]],
        hours: ['', [Validators.min(0)]],
        minutes: ['', [Validators.min(0), Validators.max(60)]]
      });
      typesService.fetchTypes();
      statusesService.fetchStatuses();
      usersService.fetchUsers();
      this.attachments = [];
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.projectId = params.projectId
      }
    );
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
    this.creatingForm.get('description')?.setValue(description);
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

  goToPreviousPage(){
    this.location.back();
  }

  createNewTask(){
    const title = this.creatingForm.get('title')?.value
    const description = this.creatingForm.get('description')?.value
    const type = this.typesService.getTypeByTitle(this.creatingForm.get('type')?.value)
    const status = this.statusesService.getStatusByTitle(this.creatingForm.get('status')?.value)
    const user = this.usersService.getUserByName(this.creatingForm.get('user')?.value)
    const hours = this.creatingForm.get('hours')?.value
    const minutes = this.creatingForm.get('minutes')?.value
    this.createTaskService.createNewTask(this.projectId!,
      title,
      description,
      type!,
      status!,
      user!,
      this.attachments,
      hours,
      minutes,
      () => {
        this.location.back();
        this.commonService.showSnakeMessage("Task successfully created");
      })
  }
}
