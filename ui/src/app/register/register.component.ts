import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { SubmissionService } from '../../../../ui-admin/src/app/admin/submission.service';
import { MzModalService } from 'ng2-materialize';
import { ModalComponent } from '../modal/modal.component';

import { CanadianProvince, CANADIANPROVINCES, CustomValidators, FormInputPostProcessors } from '../helper';

const MAX_CHILDREN = 5; // TODO: get this from some configuration var?

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [SubmissionService]
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private submissionService: SubmissionService,
    private modalService: MzModalService
    ) {}

  provinces: CanadianProvince[] = CANADIANPROVINCES;
  readonly maxChildren: number = MAX_CHILDREN;

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
        is_photo_allowed: [true, Validators.required], // apply the same for all children
        is_photo_public_use_allowed: [true, Validators.required], // apply the same for all children
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
    for (let group in this.childForm.controls)
      CustomValidators.applyControlChangesValidationHandler(this.childForm.controls[group]);

    // We want the photo allowed and public use checkboxes to be linked such that
    // when the photo allowed one is unchecked, the public use one is automatically
    // disabled; and is reenabled upon checking.
    this.childForm.get('parent').get('is_photo_allowed').valueChanges.subscribe((value: boolean) => {
      const linkedControl = this.childForm.get('parent').get('is_photo_public_use_allowed');

      const formState = ({value: false, disabled: true});
      if (value) {
        formState.value = true;
        formState.disabled = false;
      }

      linkedControl.reset(formState);
    });
  }

  get childrenArray (): FormArray {
    return this.childForm.get('children') as FormArray;
  }
  
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
              medical_info: ['', Validators.maxLength(900)],
            });

      // Apply validator observers for each control
      CustomValidators.applyControlChangesValidationHandler(newChildGroup);

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
  }

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

      // Clean the input just before submitting
      submission["parent_phone"] = FormInputPostProcessors.phone(submission["parent_phone"]);
      submission["emergency_phone"] = FormInputPostProcessors.phone(submission["emergency_phone"]);
      submission["address"]["postal_code"] = FormInputPostProcessors.postal_code(submission["address"]["postal_code"]);

      // Submit away!
      const modalOptions = {
        title: `<span class="green-text">Success!</span>`,
        message: `Thank you, <b>${submission["parent_first_name"] + " " + submission["parent_last_name"]}</b>. Your child${(formData.children.length > 1) ? 'ren have' : ' has'} been successfully registered for VBS 2017.`
      }; // assume success by default
      this.submissionService.putSubmission({query: "child", data: submission})
                            .then((data) => {
                              if (data.is_in_waiting_list && 
                                (data.is_in_waiting_list.toString().toLowerCase() == "yes" ||
                                data.is_in_waiting_list.toString().toLowerCase() == "true")
                                ) {
                                modalOptions.title = `<span class="orange-text">We're full...</span>`;
                                modalOptions.message = `But do not despair - your child${(formData.children.length > 1) ? 'ren' : ''} will be registered on our waiting list. We will promptly contact you if more room is made available.`;
                                return Promise.resolve();
                              }
                            })
                            .catch(err => {
                              console.error(`Failed to put submission into the server: ${err}`);

                              modalOptions.title = `<span class="red-text">Failed :(</span>`;
                              modalOptions.message = "We were unable to process your submission. Please try again later. Sorry for the inconvenience!";
                            })
                            // finally, pop up the notification modal
                            .then(() => {
                              const modal = this.modalService.open(ModalComponent).instance as ModalComponent;
                              modal.title = modalOptions.title;
                              modal.message = modalOptions.message;
                            });
    })
  };  
}
