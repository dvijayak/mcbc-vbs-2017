import { Component, OnInit } from '@angular/core';

import { Child } from '../../../../ui/src/app/models/child';
import { ChildService } from '../../../../ui/src/app/models/child.service';
import { Volunteer } from '../../../../ui/src/app/models/volunteer';
import { VolunteerService } from '../../../../ui/src/app/models/volunteer.service';

@Component({
   selector: 'app-admin',
   templateUrl: './admin.component.html',
   styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

   constructor(
      private childService: ChildService,
      private volunteerService: VolunteerService
   ) { }

   ngOnInit(): void {
      this.getChildren();
      this.getVolunteers();
   }

   children: Child[] = [];
   getChildren (): void {
      this.childService.getChildren()
          .then(children => this.children = children);
          // .catch(err => console.error(err)); // TODO: display toast or something
   }

   volunteers: Volunteer[] = [];
   getVolunteers (): void {
      this.volunteerService.getVolunteers()
          .then(volunteers => this.volunteers = volunteers);
          // .catch(err => console.error(err)); // TODO: display toast or something
   }

}
