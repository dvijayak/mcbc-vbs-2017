import { Injectable } from '@angular/core';

import { Volunteer } from './volunteer';
import { VOLUNTEERS } from './mock-volunteers';

/// Presumably, the Service is where we would have code that
/// interacts with the DB backend.
@Injectable() // <-- never forget the parentheses after the decorator
export class VolunteerService {
   getVolunteers (success: (volunteers: Volunteer[]) => any): void {
      success(VOLUNTEERS);
   }
}