import { Component, OnInit, Input } from '@angular/core';

import { CanadianProvince, CANADIANPROVINCES } from '../helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // We assume that jQuery is loaded in this project
    $('.datepicker').pickadate({
       selectMonths: true, // Creates a dropdown to control month
       selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  }

  provinces: CanadianProvince[] = CANADIANPROVINCES;

  onClickSubmit (): void {
    // TODO: Present review/confirmation screen
    alert("TODO: Submitted!");
  };

  @Input() canPhotoChild: boolean = false;

  onChangeCanPhotoChild (event): void {
    this.canPhotoChild = event.target.checked;
  }
}
