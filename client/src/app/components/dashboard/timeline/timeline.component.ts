import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService} from '../../../services/post.service';
import { AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';
import {MdSnackBar} from '@angular/material';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  posting = false;
  form;
  username;
  loginId;
  messageClass;
  message;
  posts;



  constructor( private snackBar : MdSnackBar ,private authService : AuthService, private postService : PostService, private formBuilder : FormBuilder,private router: Router) { 
    
   this.form = this.formBuilder.group({
      content: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
      ])]
    });
  };

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onPostSubmit() {
    this.posting = true;

    const post = {
      content: this.form.get('content').value,
      createdBy: this.username,
      createdLoginId : this.loginId
    }

    this.postService.newPost(post).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.posting = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllPosts();
        this.posting = false;
          this.message = false;
          this.form.reset();
      }
    });
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data.posts;
      this.message = false;
    });
  }

  votePost(id) {
    this.postService.votePost(id).subscribe(data => {
      this.getAllPosts();
    });
  }

  deletePost(id) {
    this.postService.deletePost(id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllPosts();
      }
    });
  }


  
  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.name;
      this.loginId = profile.user.loginId;
    });

    this.getAllPosts();


  }
}
