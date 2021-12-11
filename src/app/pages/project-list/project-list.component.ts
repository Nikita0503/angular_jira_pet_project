import { Router } from '@angular/router';
import { ProjectMembersComponent } from './../../components/dialogs/project-members/project-members.component';
import { CreateProjectComponent } from './../../components/dialogs/create-project/create-project.component';
import { EditProjectComponent } from './../../components/dialogs/edit-project/edit-project.component';
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
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.fetchCurrentUser();
    this.projectsService.fetchAllProjects();
  }

  get projects(){
    return this.projectsService.projects
  }

  openConfirmDeletingDialog(project: Project){
    let dialogRef = this.dialog.open(DeleteProjectComponent, {
      data: project.title
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.projectsService.deleteProject(project.id);
      }
    })
  }

  openEditingDialog(project: Project){
    let dialogRef = this.dialog.open(EditProjectComponent, {
      data: {...project}
    });
    dialogRef.afterClosed().subscribe();
  }

  openCreatingDialog(){
    let dialogRef = this.dialog.open(CreateProjectComponent);
    dialogRef.afterClosed().subscribe();
  }

  openProjectMembers(project: Project){
    let dialogRef = this.dialog.open(ProjectMembersComponent, {
      data: {...project}
    });
    dialogRef.afterClosed().subscribe();
  }

  openTaskListPage(project: Project){
    this.router.navigate(['/tasks'], {
      queryParams: {
        projectId: project.id
      }
    });
  }
}
