import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BugService {

  options;
  authToken;
  domain = this.authService.domain;

  constructor(private authService: AuthService, private http: Http) { }

  createNewbug(bug){

    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'bugs/createBug', bug, this.options).map(res => res.json());
  }


  getSingleBug(bugId){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'bugs/getSingleBug/' + bugId, this.options).map(res => res.json());
  }

  loadAllBugs(loginId){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'tasks/allBugs/' + loginId, this.options).map(res => res.json());

  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

}
