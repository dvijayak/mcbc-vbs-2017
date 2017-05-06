import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Volunteer } from './volunteer';

@Injectable()
export class VolunteerService {

  constructor(private http: Http) { }

  private getData (res: Response) {
     const data = res.json().data;
     return (!data) ? {} : (data.volunteers || {});
  }

  getVolunteers () : Promise<Volunteer[]> {
     const headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Accept', 'application/json');
     return this.http.get('/api/volunteer')
                .map(this.getData)
                .toPromise()
                .catch(err => console.error(err));
  }

}
