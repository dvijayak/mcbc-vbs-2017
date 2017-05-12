import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { SubmissionService } from '../../../../ui-admin/src/app/admin/submission.service';

import { CanadianProvince, CANADIANPROVINCES, AREASOFINTEREST, CustomValidators } from '../helper';

import { Volunteer } from '../models/volunteer';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css'],
  providers: [SubmissionService]
})
export class VolunteerComponent implements OnInit, OnChanges {

  constructor(private formBuilder: FormBuilder, private submissionService: SubmissionService) {}

  volunteerForm: FormGroup;

  ngOnInit () {
    // Create the form
    this.volunteerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      shirt_size: ['', Validators.required],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        province: ['', Validators.required],
        postal_code: ['', [Validators.required, CustomValidators.postal_code]],
      }),
      phone: ['', [Validators.required, CustomValidators.phone]],
      email: ['', [Validators.required, Validators.email]],
      is_adult: [false, Validators.required],
      police_check_completed: [{value: false, disabled: true}, Validators.required],
      ranked_aoi: ['', Validators.required],
      emergency: this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        relationship: ['', Validators.required],
        phone: ['', [Validators.required, CustomValidators.phone]],
      }),
    });

    // Apply validator observers for each control
    for (let group in this.volunteerForm.controls)
      CustomValidators.applyControlChangesValidationHandler(this.volunteerForm.controls[group]);

    // We want the is adult and police check checkboxes to be linked such that when
    // the former is unchecked, the latter is automatically disabled; and is reenabled
    // upon checking.
    this.volunteerForm.get('is_adult').valueChanges.subscribe((value: boolean) => {
      const linkedControl = this.volunteerForm.get('police_check_completed');

      const formState = ({value: false, disabled: true});
      if (value) {
        formState.disabled = false;
      }

      linkedControl.reset(formState);
    });
  }

  ngOnChanges() {}

  onSubmit (): void {
    // TODO: Present review/confirmation screen

    // Construct submission and send over to the server to be stored in the DB
    const formData = this.volunteerForm.value;
    const submission = {};

    // Emergency
    for (let prop in formData.emergency)
      submission[`emergency_${prop}`] = formData.emergency[prop];

    // Volunteer
    for (let prop in formData)
      if (prop !== 'emergency')
        submission[prop] = formData[prop];

    console.log(submission);
    this.submissionService.putSubmission({query: "volunteer", data: submission})
                          // .then(); TODO: notify user
                          ;
  };

  readonly provinces: CanadianProvince[] = CANADIANPROVINCES;
  readonly aoi: string[] = AREASOFINTEREST;
}
