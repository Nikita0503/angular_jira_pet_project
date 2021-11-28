import { User } from './../../../shared/user.service';
import { RegisterProjectService } from './../../../shared/register-project.service';
import { Observable } from 'rxjs';
import CustomFormValidators from 'src/app/validators/index';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {

  creatingForm: FormGroup;

  constructor(private fb: FormBuilder, private registerProjectService: RegisterProjectService, public dialogRef: MatDialogRef<CreateProjectComponent>) {
    this.creatingForm = this.fb.group({
      title: ['', [Validators.required, CustomFormValidators.noWhitespaceValidator], [projectTitleValidator(registerProjectService)]],
      description: ''
    });
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

  changeUserStatus(selectedUser: User){
    this.registerProjectService.changeUserStatus(selectedUser);
  }

  skipStep(stepper: MatStepper){
    stepper.next()
    this.registerProjectService.updateProjects();
  }

  createNewProject(stepper: MatStepper){
    const title = this.creatingForm.get('title')?.value
    const description = this.creatingForm.get('description')?.value
    this.registerProjectService.createNewProject(title, description, () => stepper.next());
  }

  addUsersToCreatedProject(stepper: MatStepper){
    this.registerProjectService.addUsersToProject(() => stepper.next());
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}

const projectTitleValidator = (registerProjectService: RegisterProjectService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return registerProjectService.checkExistsProject(control.value).pipe(map((result: any) => {
      return result.exist ? { projectExists: true } : null;
    }))
  };
}
