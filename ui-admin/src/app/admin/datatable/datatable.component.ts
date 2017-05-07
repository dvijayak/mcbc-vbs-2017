import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { SubmissionService } from '../submission.service';

/// Model representing submissions (children/volunteers)
class DataModel {
   submissions: any[] = [];
   headers: any[] = [];
}

@Component({
   selector: 'app-datatable',
   templateUrl: './datatable.component.html',
   styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit, OnChanges {

   constructor (private submissionService: SubmissionService) {}

   model: DataModel = new DataModel();
 
   @Input() query: string = "child";
   @Input() displayedColumns : string[]; // TODO: Default to all? Or some?
   @Input() filters: string[] = [];

   ngOnInit () {
      this.refreshModel(true);
   }

   ngOnChanges (changes: SimpleChanges) {
      for (let prop in changes) {
         switch (prop) {
            case "query":
               this.refreshModel(true);
               break;
            case "displayedColumns":
               // TODO
               break;
            case "filters":
               this.refreshModel(false); // we are applying a client-side filter
               break;
           default:
              console.error("Unhandled data-bound input property change.");
         }
      }
   }

   onClickReload (): void {
      this.refreshModel(true);
   }


   private refreshModel (fetch: boolean): void {
      // 1. retrieve submissions from server, if requested
      if (fetch)
      {
         this.submissionService.getSubmissions({query: this.query, pretty: true})
                               .then((data) => {
                                  if (!data)
                                     return;

                                  this.model = new DataModel(); // the new assignment will a trigger change detection

                                  this.model.submissions = data.submissions;

                                  // Transform headers into ngx-datatable format
                                  for (let prop in data.headers)
                                     this.model.headers.push({
                                        prop: prop,
                                        name: data.headers[prop]
                                     });
                               });
      }

      // 2. apply any filters
      // TODO
   }
}
