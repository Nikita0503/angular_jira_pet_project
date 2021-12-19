import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'projects', component: ProjectListComponent},
  {path: 'tasks', component: TaskListComponent},
  {path: 'task-creation', component: CreateTaskComponent},
  {path: 'task-details', component: TaskDetailsComponent},
  {path: 'task-editing', component: EditTaskComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
