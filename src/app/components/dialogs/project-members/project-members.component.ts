import { User } from './../../../shared/user.service';
import { Project } from './../../../shared/projects.service';
import { ProjectMembersService } from './../../../shared/project-members.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.css']
})
export class ProjectMembersComponent implements OnInit {
  selectedProject: Project;

  constructor(
    private projectsMembersService: ProjectMembersService,
    @Inject(MAT_DIALOG_DATA) public data: Project) {
      this.selectedProject = data;
  }

  ngOnInit(): void {
    this.projectsMembersService.fetchAllUsers();
    this.projectsMembersService.fetchProjectMembers(this.selectedProject.id);
  }

  get allUsers(): User[]{
    return this.projectsMembersService.allUsers;
  }

  get projectMembers(): User[]{
    return this.projectsMembersService.projectMembers;
  }

  addUserToProject(user: User){
    this.projectsMembersService.addUserToProject(this.selectedProject.id, user)
  }

  removeUserFromProject(user: User){
    this.projectsMembersService.removeUserFromProject(this.selectedProject.id, user)
  }
}
