import { TasksService } from './../../shared/tasks.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  projectId?: number;

  constructor(private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.projectId = params.projectId
        this.tasksService.fetchAllTasks(params.projectId)
      }
    );
  }

  openCreatingTaskPage(){
    this.router.navigate(['/task-creation'], {
      queryParams: {
        projectId: this.projectId
      }
    });
  }

  get tasks(){
    return this.tasksService.tasks
  }

}
