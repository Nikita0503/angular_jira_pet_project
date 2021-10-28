import CustomFormValidators from 'src/app/validators/index';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {

  creatingForm: FormGroup;

  constructor(private fb: FormBuilder,) {
    this.creatingForm = this.fb.group({
      title: ['', [Validators.required, CustomFormValidators.noWhitespaceValidator]],
      description: ''
    });
  }

  get description(){
    return this.creatingForm.get('description')?.value
  }

  changeDescription(event: any){
    this.creatingForm.get('description')?.setValue(event.target.value);
  }

}
