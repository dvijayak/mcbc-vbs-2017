import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Child } from './child';

@Injectable()
export class ChildService {

  constructor(private http: Http) { }

  private getData (res: Response) {
     const data = res.json().data;
     return (!data) ? {} : (data.children || {});
  }

  getChildren () : Promise<any> {
     const headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Accept', 'application/json');
     return this.http.get('/api/child')
                .map(this.getData)
                .toPromise()
                .catch(err => console.error(err));
  }

}
