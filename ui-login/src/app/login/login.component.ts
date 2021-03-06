import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

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

  loginError: boolean = false;

  onSubmit (): void {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Accept', 'application/json');
     this.http.post(this.targetUrl, JSON.stringify(this.model), { headers: headers } )
        .map( (res: Response) => res.json() )
        .subscribe( res => {
          this.loginError = false;
          window.location.href = res.data.redirectUrl;
        }, err => {
          this.loginError = true;
          console.error(err)
          window.location.href = err.data.redirectUrl;
        });
  }
}
