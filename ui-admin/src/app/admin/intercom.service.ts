import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class IntercomService {

   constructor() {}

   // Observable sources
   private querySource = new Subject<string>();

   // Observable streams
   query$tream = this.querySource.asObservable();

   // Service message commands
   emitQuery (query: string) {
      this.querySource.next(query);
   }

}
