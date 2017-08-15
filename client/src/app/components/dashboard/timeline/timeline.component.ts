import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  form;
  editForm;
  username;
  loginId;
  messageClass;
  message;
  posts;
  operations = false;


  constructor(private authService: AuthService, private postService: PostService, private formBuilder: FormBuilder, private router: Router) {

    this.form = this.formBuilder.group({
      content: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
      ])]
    });

    this.editForm = this.formBuilder.group({
      editContent: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
      ])]
    });


  };

  onPostSubmit() {

    const post = {
      content: this.form.get('content').value,
      createdBy: this.username,
      createdLoginId: this.loginId
    }

    this.postService.newPost(post).subscribe(data => {
      if (!data.success) {
        this.operations = true;
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.operations = true;
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllPosts();
        this.form.reset();
      }
    });
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data.posts;
      setTimeout(() => {
      this.operations = false;
        }, 3000);
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
        this.operations = true;
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.operations = true;
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllPosts();
      }
    });
  }

  editPost(post) {

    const newPost = {
      _id: post._id,
      content: this.editForm.get('content').value,
      createdBy: this.username,
      createdLoginId: this.loginId
    }

    this.postService.editPost(newPost).subscribe(data => {
      if (!data.success) {
        this.operations = true;
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.editForm.reset();
      } else {
        this.operations = true;
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllPosts();
        this.editForm.reset();
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
