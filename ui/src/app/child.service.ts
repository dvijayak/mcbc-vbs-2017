import { Injectable } from '@angular/core';

import { Child } from './child';
import { CHILDREN } from './mock-children';

/// Presumably, the Service is where we would have code that
/// interacts with the DB backend.
@Injectable() // <-- never forget the parentheses after the decorator
export class ChildService {
   getChildren (success: (children: Child[]) => any): void {
      success(CHILDREN);
   }
}