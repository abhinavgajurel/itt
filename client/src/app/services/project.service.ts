import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ProjectService {

  options;
  authToken;
  domain = this.authService.domain;

  constructor(private authService: AuthService, private http: Http) { }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }


  getAllMembers() {

    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'projects/allUsers', this.options).map(res => res.json());

  }

  createNewProject(project) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'projects/createproject', project, this.options).map(res => res.json());
  }

  loadAllProjects(loginId){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'projects/allProjects/' + loginId, this.options).map(res => res.json());

  }

  getSingleProject(projectId){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'projects/getSingleProject/' + projectId, this.options).map(res => res.json());

  }

  //not in use
  getProjectMembers(members){
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'projects/getProjectMembers/' , members, this.options).map(res => res.json());

  }

}
