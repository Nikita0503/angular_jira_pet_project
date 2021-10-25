import { ProjectsService } from './../../shared/projects.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/user.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private userService: UserService,
    private projectsService: ProjectsService) { }

  ngOnInit() {
    this.userService.fetchCurrentUser();
    this.projectsService.fetchAllProjects();
  }

  get projects(){
    return this.projectsService.projects
  }

}
