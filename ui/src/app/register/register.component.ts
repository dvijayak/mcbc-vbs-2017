import { Component, ViewChild, ElementRef, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { SubmissionService } from '../../../../ui-admin/src/app/admin/submission.service';

import { CanadianProvince, CANADIANPROVINCES, CustomValidators } from '../helper';

import { Child } from '../models/child';

const MAX_CHILDREN = 5; // TODO: get this from some configuration var?

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [SubmissionService]
})
export class RegisterComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(private formBuilder: FormBuilder, private submissionService: SubmissionService) {}

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
          postal_code: ['', [Validators.required, CustomValidators.postal_code]],
        }),
        phone: ['', [Validators.required, CustomValidators.phone]],
        email: ['', [Validators.required, Validators.email]],
        is_photo_allowed: ['true', Validators.required], // apply the same for all children
        is_photo_public_use_allowed: ['true', Validators.required], // apply the same for all children
      }),
      emergency: this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        relationship: ['', Validators.required],
        phone: ['', [Validators.required, CustomValidators.phone]],
      }),
      children: this.formBuilder.array([]),
    });
    this.addChild(); // keep one child form ready

    // Apply validator observers for each control
    (this.childForm.get('parent').get('email') as any).errorMessage = null;
    // this.childForm.get('parent').get('email').valueChanges.subscribe(changes => (this.childForm.get('parent').get('email') as any).errorMessage = changes);
  }

  @ViewChild('parent_first_name') el: ElementRef;
  ngAfterViewInit () {
    const el = $(this.el.nativeElement);
    console.log(el);
    el.addClass('invalid');
  }

  get childrenArray (): FormArray {
    return this.childForm.get('children') as FormArray;
  }

  ngOnChanges() {}

  onSubmit (): void {
    // TODO: Present review/confirmation screen

    // Construct submissions based on the number of children in the form model, then
    // send over to the server to be stored in the DB
    const formData = this.childForm.value;
    formData.children.forEach(child => {
      const submission = {};

      // Parent
      for (let prop in formData.parent)
        if (['address',
             'is_photo_allowed',
             'is_photo_public_use_allowed',
            ].find(el => prop === el))
          submission[prop] = formData.parent[prop];
        else
          submission[`parent_${prop}`] = formData.parent[prop];

      // Emergency
      for (let prop in formData.emergency)
        submission[`emergency_${prop}`] = formData.emergency[prop];

      // Child
      for (let prop in child)
        submission[prop] = child[prop];

      console.log(submission);
      this.submissionService.putSubmission({query: "child", data: submission})
                            // .then(); TODO: notify user
                            ;
    })
  };

  provinces: CanadianProvince[] = CANADIANPROVINCES;

  readonly maxChildren: number = MAX_CHILDREN;
  
  addChild (): void {
    let n: number = this.childrenArray.length;
    if (n < MAX_CHILDREN) {
      // Create a new child form group
      const newChildGroup: FormGroup = this.formBuilder.group({
              first_name: ['', Validators.required],
              last_name: ['', Validators.required],
              dob: ['', Validators.required],
              grade: ['', Validators.required],
              shirt_size: ['', Validators.required],
              medical_info: [''],
            });

      // Add the new control to the array
      this.childrenArray.push(newChildGroup);

      // Initialize the datepicker for the DOB control
      // We assume that jQuery is loaded in this project
      // TODO: Still not perfect...race condition with the actual creation of the object in the DOM...
      setTimeout(function () {
        $(`.datepicker`).pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 30,
          // We need to update the form model explicitly here, as the pickadate
          // widget works a bit differently than the standard HTML5 datepicker element
          onClose: function (val) {
            newChildGroup.get('dob').setValue(this.get());
          }
        });
      }, 450); // timeout is SUPER hacky...FIX THIS
    }
    else {
      // TODO: Provide feedback
    }
  }
}
