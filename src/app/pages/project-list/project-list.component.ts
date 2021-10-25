import { DeleteProjectComponent } from './../../components/dialogs/delete-project/delete-project.component';
import { Project, ProjectsService } from './../../shared/projects.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private userService: UserService,
    private projectsService: ProjectsService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.fetchCurrentUser();
    this.projectsService.fetchAllProjects();
  }

  get projects(){
    return this.projectsService.projects
  }

  openConfirmDialog(project: Project){
    let dialogRef = this.dialog.open(DeleteProjectComponent, {
      data: project.title
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.projectsService.deleteProject(project.id);
      }
    })
  }
}
