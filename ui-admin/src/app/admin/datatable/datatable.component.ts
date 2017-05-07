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
      // Since ngOnChanges is guaranteed to be called before ngOnInit upon initialization
      // as per the Angular lifecycle hooks design, we don't need to initialize the data
      // model here, thus saving us one expensive HTTP request.
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
                               .then(this.updateDataModel.bind(this));
      }

      // 2. apply any filters
      // TODO
   }

   private updateDataModel (data) {
      if (!data)
         return;

      // Note: change detection will be triggered 

      this.model.submissions = data.submissions;

      // Transform headers into ngx-datatable format
      this.model.headers = [];
      for (let prop in data.headers)
         this.model.headers.push({
         prop: prop,
         name: data.headers[prop],
      });
   }
}
