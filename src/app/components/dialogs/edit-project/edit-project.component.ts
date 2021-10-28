import { CommonService } from './../../../shared/common.service';
import { ProjectsService } from './../../../shared/projects.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/shared/projects.service';
import CustomFormValidators from 'src/app/validators/index'

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {

  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private fb: FormBuilder,
    private commonService: CommonService,
    private projectService: ProjectsService) {
      this.editForm = this.fb.group({
        title: ['', [Validators.required, CustomFormValidators.noWhitespaceValidator]],
      });
    }

    changeDescription(event: any){ //TODO: research Type for event input
      this.data.description = event.target.value
    }

    onSubmitClick(): void {
      this.projectService.editProject(this.data,
      (message: string) => {
        this.dialogRef.close(true);
        this.commonService.showSnakeMessage(message);
      },
      (errorMessage: string) => {
        this.commonService.showSnakeMessage(errorMessage);
      });
    }

    onDeclineClick(): void {
      this.dialogRef.close(false);
    }

}
