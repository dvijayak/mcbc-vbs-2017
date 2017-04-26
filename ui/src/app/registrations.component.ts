import { Component, OnInit } from '@angular/core';

import { Child } from './child';
import { ChildService } from './child.service';
import { Volunteer } from './volunteer';
import { VolunteerService } from './volunteer.service';

// Decorator for the RegistrationsComponent, which specifies the render-
// related data, including template and the unique HTML tag to
// be used
@Component({
  moduleId: module.id,
  selector: 'registrations',
  templateUrl: 'registrations.component.html',
  // styleUrls: [], // TODO
})
export class RegistrationsComponent implements OnInit {
   constructor (private childService : ChildService, private volunteerService: VolunteerService) {} // this is some dependency injection magic in NG that allows your to instantiate private member data services without calling 'new' on it (which is a bad idea since it tightens coupling)

   // The constructor must as much as possible be very simple 
   // and restricted to declarative code (like the private 
   // ChildService here). So then where do we call this.getHeroes()?
   // Answer: NG's lifecycle hooks, namely the OnInit hook:
   ngOnInit (): void {
      this.getChildren();
      this.getVolunteers();
   }

   children: Child[];
   volunteers: Volunteer[];

   getChildren (): void {
      this.childService.getChildren((children: Child[]) => this.children = children);
   }
   getVolunteers (): void {
      this.volunteerService.getVolunteers((volunteers: Volunteer[]) => this.volunteers = volunteers);
   }
}
