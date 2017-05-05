import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Http, Headers } from '@angular/http';

class User {
   username: string;
   password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: Http, private location: Location) { }

  ngOnInit() {
  }

  model: User = new User();

  private readonly loginUrl: string = "/login";

  onSubmit (): void {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Accept', 'application/json');
     this.http.post(this.loginUrl, JSON.stringify(this.model), { headers: headers } )
        .subscribe( response => {
           console.log(response);
           if (response.ok) {
              // this.location
           }
           else {

           }
        }, err => {
           console.log(err);
        } );
  }
}
