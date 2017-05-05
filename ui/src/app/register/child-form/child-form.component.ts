import { Component, OnInit, Input } from '@angular/core';

import { Child } from '../../models/child';

@Component({
   selector: 'child-form',
   templateUrl: './child-form.component.html',
   styleUrls: ['./child-form.component.css']
})
export class ChildFormComponent implements OnInit {
   ngOnInit () {
      // We assume that jQuery is loaded in this project
      $(`.datepicker`).pickadate({
         selectMonths: true, // Creates a dropdown to control month
         selectYears: 30
      });
   }

   @Input() i: number; // this is the ith child in the form

   @Input() model: Child;
}