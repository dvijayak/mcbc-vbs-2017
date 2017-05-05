import { Component, OnInit, OnChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { CanadianProvince, CANADIANPROVINCES } from '../helper';

import { Child } from '../models/child';
import { Submission, MAX_CHILDREN } from './submission';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnChanges {

  constructor(
     private cdRef: ChangeDetectorRef
     ) { }

  ngOnInit() {}

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
        this.cdRef.detectChanges(); // does not get rid of the ExpressionChangedAfterItHasBeenCheckedError - read SO articles on change detection in angular, example: http://stackoverflow.com/questions/34868810/what-is-difference-between-production-and-development-mode-in-angular2/34868896#34868896
     }
     else {
        // TODO: Provide feedback
     }
  }

  addChildBool: boolean = false;

  readonly maxChildren: number = MAX_CHILDREN;

  onSubmit (): void {
    // TODO: Present review/confirmation screen
    alert("TODO: Submitted!");
  };

  canPhotoChild: boolean = false;

  onChangeCanPhotoChild (event): void {
    this.canPhotoChild = event.target.checked;
  }

  // Controls whether the form can be submitted or not
  isValidSubmission: boolean = false;
}
