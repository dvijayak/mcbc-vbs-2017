import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

class QueryOptions {
   query: string;
   pretty: boolean;

   constructor (options: any) {
      // Required
      this.query = options.query;

      // Optional
      this.pretty = options.pretty || false;
   }

   createUrl (): string {
      let query = this.query;

      // CANIMPROVE: Really brittle - will need to be changed if we add more parameters
      if (this.pretty)
         query += "?pretty=true";

      return query;
   }
}

@Injectable()
export class SubmissionService {

   constructor (private http: Http) {}

   // The result must be an array of submissions
   getSubmissions (options) : Promise<any> {
      const query = new QueryOptions(options).createUrl();

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      return this.http.get(`/api/${query}`)
                      .map((res: Response) => res.json().data || {})
                      .toPromise()
                      .then(this.processData)
                      .catch(err => console.error(`Failed to retrieve submissions from server: ${err}`));
   }

   private processData (data) {
      if (!data.submissions || !data.submissions.length)
         return Promise.resolve();

      if (!data.headers)
         data.headers = {};

      // Provide headers where unprovided
      const sample = data.submissions[0];
      for (let prop in sample)
         if (!data.headers[prop])
            data.headers[prop] = prop;

      // We are good to go!
      return Promise.resolve(data);
   }
}
