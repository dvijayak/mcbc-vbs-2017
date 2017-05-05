import { Component, OnInit } from '@angular/core';
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

  constructor(private http: Http) { }

  ngOnInit() {
  }

  model: User = new User();

  private readonly targetUrl: string = "/login";
  private readonly successUrl: string = "/admin";

  onSubmit (): void {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Accept', 'application/json');
     this.http.post(this.targetUrl, JSON.stringify(this.model), { headers: headers } )
        .subscribe( response => {
           console.log(response);
           if (response.ok) {
              window.location.href = response.url;
           }
           else {
             alert("Failed to log in!");
           }
        }, err => {
           alert(`Failed to log in! Error: ${err}`);
           console.log(err);
        } );
  }
}
