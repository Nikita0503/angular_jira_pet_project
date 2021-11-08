import { User } from './../../../shared/user.service';
import { RegisterProjectService } from './../../../shared/register-project.service';
import { Observable } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProjectsService } from './../../../shared/projects.service';
import CustomFormValidators from 'src/app/validators/index';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, NgForm, FormGroupDirective, ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {

  creatingForm: FormGroup;
  selectedUsers: User[];

  constructor(private fb: FormBuilder, private registerProjectService: RegisterProjectService) {
    this.creatingForm = this.fb.group({
      title: ['', [Validators.required, CustomFormValidators.noWhitespaceValidator], [projectTitleValidator(registerProjectService)]],
      description: ''
    });
    this.selectedUsers = [];
  }

  get description(){
    return this.creatingForm.get('description')?.value
  }

  get allUsers(){
    return this.registerProjectService.allUsers
  }

  changeDescription(event: any){
    const description = event.target.value;
    this.creatingForm.get('description')?.setValue(description);
  }

  createNewProject(){
    const title = this.creatingForm.get('title')?.value
    const description = this.creatingForm.get('description')?.value
    this.registerProjectService.createNewProject(title, description);
  }

  changeUsersInProject(selectedUser: User){
    const index = this.selectedUsers.findIndex((user: User) => selectedUser.id == user.id);
    if(index > -1){
      console.log(1)
      this.selectedUsers.splice(index, 1)
    }else{
      console.log(0)
      this.selectedUsers.push(selectedUser)
    }
    console.log(this.selectedUsers)
  }
}

const projectTitleValidator = (registerProjectService: RegisterProjectService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return registerProjectService.checkExistsProject(control.value).pipe(map((result: any) => {
      return result.exist ? { projectExists: true } : null;
    }))
  };
}
