import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  statuses: any[];
  types: any[];
  users: any[];
  files: any[];

  constructor() {
    this.statuses = [{
      title: 'Backlog'
    },
    {
      title: 'In progress'
    },
    {
      title: 'Done'
    }];
    this.types = [
      {title: 'Task'},
      {title: 'Subtask'},
      {title: 'Story'},
      {title: 'Bag'}
    ]
    this.users = [
      {name: 'User 1'},
      {name: 'User 2'},
      {name: 'User 3'},
      {name: 'User 4'}
    ]
    this.files = [1];
  }

  ngOnInit(): void {
  }

  onPickFile(event: any){
    var reader = new FileReader();
    reader.onload = (event: any) => {
      let file = event.target.result;
      console.log(file)
    };
    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  deleteFile(file: any){

  }
}
