import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

@Injectable()
export class SubmissionService {

   constructor (private http: Http) {}

   // The result must be an array of submissions
   getSubmissions (query: string) : Promise<any> {
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
