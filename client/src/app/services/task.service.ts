import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class TaskService {

  options;
  authToken;
  domain = this.authService.domain;

  constructor(private authService: AuthService, private http: Http) { }

  createNewTask(task){

    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'tasks/createTask', task, this.options).map(res => res.json());
  }


  getSingleTask(taskId){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'tasks/getSingleTask/' + taskId, this.options).map(res => res.json());
  }

  loadAllTasks(loginId){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'tasks/allTasks/' + loginId, this.options).map(res => res.json());

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

  updateTask(task){
     this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'tasks/updateTask/', task, this.options).map(res => res.json());

  }

}
