import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ApiInterceptor } from './api/api.interceptor';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteProjectComponent } from './components/dialogs/delete-project/delete-project.component';
import { EditProjectComponent } from './components/dialogs/edit-project/edit-project.component';
import { CreateProjectComponent } from './components/dialogs/create-project/create-project.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { ProjectsFilterPipe } from './shared/pipes/projects-filter.pipe';
import { ProjectMembersComponent } from './components/dialogs/project-members/project-members.component';
import { UsersNotInProjectPipe } from './shared/pipes/users-not-in-project.pipe';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import { ImageComponent } from './components/dialogs/image/image.component';
import { TimePipe } from './shared/pipes/time.pipe';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentsPipe } from './shared/pipes/comments.pipe';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    NotFoundComponent,
    ProjectListComponent,
    DeleteProjectComponent,
    EditProjectComponent,
    CreateProjectComponent,
    ProjectsFilterPipe,
    ProjectMembersComponent,
    UsersNotInProjectPipe,
    TaskListComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    ImageComponent,
    TimePipe,
    CommentsComponent,
    CommentsPipe,
    EditTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    MatTabsModule,
    MatListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
