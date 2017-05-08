import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
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
export class VolunteerComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(private formBuilder: FormBuilder, private submissionService: SubmissionService) {}

  volunteerForm: FormGroup;

  ngOnInit () {
    // Create the form
    this.volunteerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dob: ['', Validators.required],
      // grade: ['', Validators.required], // TODO: do we need, if we are using DOB?
      shirt_size: ['', Validators.required],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        province: ['', Validators.required],
        postal_code: ['', Validators.required],
      }),
      phone: ['', Validators.required],
      email: ['', Validators.required],
      police_check_completed: ['', Validators.required],
      ranked_aoi: ['', Validators.required], // must select top 3
      emergency: this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        relationship: ['', Validators.required],
        phone: ['', Validators.required],
      }),
    });
  }

  ngAfterViewInit () {
    // Initialize the datepicker for the DOB control
    // We assume that jQuery is loaded in this project
    $(`.datepicker`).pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 200,
      // We need to update the form model explicitly here, as the pickadate
      // widget works a bit differently than the standard HTML5 datepicker element
      onClose: function (val) {
        // TODO: we need to handle getting the 'this' reference to be the correct date control (discriminate between the DOB and police check completed ones)
        // newVolunteerGroup.get('dob').setValue(this.get());
      }
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
