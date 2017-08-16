import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class PostService {

  options;
  domain = this.authService.domain;

  constructor(private authService: AuthService,
    private http: Http) { }

  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

  getAllPosts() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'posts/allPosts', this.options).map(res => res.json());
  }

  newPost(post) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'posts/newPost', post, this.options).map(res => res.json());
  }

  votePost(id) {
    const broadcastData = { id: id };
    return this.http.put(this.domain + 'posts/votePost/', broadcastData, this.options).map(res => res.json());
  }

  unVotePost(id) {
    const broadcastData = { id: id };
    return this.http.put(this.domain + 'posts/unVotePost/', broadcastData, this.options).map(res => res.json());
  }

  deletePost(id) {
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'posts/deletePost/' + id, this.options).map(res => res.json());
  }

  editPost(broadcastData) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'posts/editPost/', broadcastData, this.options).map(res => res.json());
  }

  getPost(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'posts/getPost/' + id, this.options).map(res => res.json());
  }

   postAnswer(id, answer) {
    this.createAuthenticationHeaders();
    const postData = {
      id: id,
      answer: answer
    }
    return this.http.post(this.domain + 'posts/answerPost', postData, this.options).map(res => res.json());

  }

}
