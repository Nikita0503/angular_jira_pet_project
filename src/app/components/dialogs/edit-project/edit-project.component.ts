import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/shared/projects.service';

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
    private fb: FormBuilder) {
      this.editForm = this.fb.group({
        title: ['', [Validators.required, this.noWhitespaceValidator]],
      });
    }

    changeDescription(event: any){ //research Type for event input
      this.data.description = event.target.value
    }

    onDeclineClick(): void {
      this.dialogRef.close(false);
    }

    public noWhitespaceValidator(control: FormControl) { // TODO: make that common validator (transfer to 'validators' folder)
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
    }
}
