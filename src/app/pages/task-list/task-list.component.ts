import { TasksService } from './../../shared/tasks.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.tasksService.fetchAllProjects(params.projectId)
      }
    );
  }

  openCreatingTaskPage(){
    this.router.navigate(['/task-creation']);
  }

  get tasks(){
    return this.tasksService.tasks
  }

}
