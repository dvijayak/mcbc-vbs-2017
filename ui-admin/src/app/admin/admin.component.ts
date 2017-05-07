import { Component, OnInit } from '@angular/core';

import { IntercomService } from './intercom.service';

@Component({
   selector: 'app-admin',
   templateUrl: './admin.component.html',
   styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

   constructor (private intercom: IntercomService) {
      this.intercom.query$tream.subscribe(query => this.query = query); // no need to track subscription to unsubscribe upon component destruction - why? because we are subscribing to a *child* component, so if the parent component dies, the child will also die, thus guaranteeing no memory leak
   }

   ngOnInit (): void {}

   query: string = "child"; // we begin by showing the children registrations
   displayedColumns: string[] = [];
   filters: string[] = [];

}
