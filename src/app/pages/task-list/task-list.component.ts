import { CommonService } from './../../shared/common.service';
import { Task, TasksService } from './../../shared/tasks.service';
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
    private commonService: CommonService,
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

  openTaskDetails(task: Task){
    this.router.navigate(['/task-details'], {
      queryParams: {
        projectId: this.projectId,
        taskId: task.id
      }
    });
  }

  get tasks(){
    return this.tasksService.tasks
  }

  deleteTask(task: Task){
    this.tasksService.deleteTask(this.projectId!, task.id, () => {
      this.commonService.showSnakeMessage('Task deleted successfully')
    });
  }

}
