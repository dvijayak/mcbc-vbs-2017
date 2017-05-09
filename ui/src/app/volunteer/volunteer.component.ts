import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { SubmissionService } from '../../../../ui-admin/src/app/admin/submission.service';

import { CanadianProvince, CANADIANPROVINCES, AREASOFINTEREST } from '../helper';

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
        postal_code: ['', Validators.required],
      }),
      phone: ['', Validators.required],
      email: ['', Validators.required],
      is_adult: ['', Validators.required],
      police_check_completed: ['', Validators.required],
      ranked_aoi: ['', Validators.required],
      emergency: this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        relationship: ['', Validators.required],
        phone: ['', Validators.required],
      }),
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
