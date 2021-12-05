import { UsersService } from './../../shared/users.service';
import { StatusesService } from './../../shared/statuses.service';
import { TypesService } from './../../shared/types.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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

  creatingForm: FormGroup;
  attachments: Attachment[];

  constructor(private fb: FormBuilder,
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
}
