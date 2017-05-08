import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { CanadianProvince, CANADIANPROVINCES } from '../helper';

import { Child } from '../models/child';
import { Submission, MAX_CHILDREN } from './submission';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnChanges {

  constructor(private formBuilder: FormBuilder) {}

  childForm: FormGroup;

  ngOnInit () {
    // Create the form
    this.childForm = this.formBuilder.group({
      parent: this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        address: this.formBuilder.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          province: ['', Validators.required],
          postal_code: ['', Validators.required],
        }),
        phone: ['', Validators.required],
        email: ['', Validators.required],
        is_photo_allowed: ['', Validators.required], // apply the same for all children
        is_photo_public_use_allowed: ['', Validators.required], // apply the same for all children
      }),
      emergency: this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        relationship: ['', Validators.required],
        phone: ['', Validators.required],
      }),
      // children: this.formBuilder.array([]),
    });
  }


  ngOnChanges() {
     console.log(this.addChildBool);
  }

  model: Submission = new Submission();

  provinces: CanadianProvince[] = CANADIANPROVINCES;

  addChild (): void {
     let n: number = this.model.children.length;
     if (n < MAX_CHILDREN) {
        // this.addChildBool = true;
        this.model.children.push(new Child());
     }
     else {
        // TODO: Provide feedback
     }
  }

  addChildBool: boolean = false;

  readonly maxChildren: number = MAX_CHILDREN;

  onSubmit (): void {
    // TODO: Present review/confirmation screen
    alert(`TODO: Submitted!\n${JSON.stringify(this.childForm.value)}`);
  };
}
