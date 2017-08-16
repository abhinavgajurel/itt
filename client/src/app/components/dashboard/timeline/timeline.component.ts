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
  answerForm;
  username;
  loginId;
  messageClass;
  message;
  posts;
  operations = false;
  editPostContent = undefined;
  editPostId = undefined;
  deletePostId = undefined;
  newAnswer = [];
  enabledAnswers = [];
  viewAnswers = [];


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

    this.answerForm = this.formBuilder.group({
      answer: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ])]
    })



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
        this.messageClass = 'alert alert-danger fade in';
        this.message = data.message;
      } else {
        this.operations = true;
        this.messageClass = 'alert alert-success fade in';
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

  unVotePost(id) {
    this.postService.unVotePost(id).subscribe(data => {
      this.getAllPosts();
    });
  }

  deletePost() {
    this.postService.deletePost(this.deletePostId).subscribe(data => {
      if (!data.success) {
        this.operations = true;
        this.messageClass = 'alert alert-danger fade in';
        this.message = data.message;
      } else {
        this.operations = true;
        this.messageClass = 'alert alert-success fade in';
        this.message = data.message;
        this.getAllPosts();
      }
    });
  }

  editPost() {

    const newPost = {
      _id: this.editPostId,
      content: this.editForm.get('editContent').value,
      createdBy: this.username,
      createdLoginId: this.loginId
    }

    this.postService.editPost(newPost).subscribe(data => {
      if (!data.success) {
        this.operations = true;
        this.messageClass = 'alert alert-danger fade in';
        this.message = data.message;
        this.editForm.reset();
      } else {
        this.operations = true;
        this.messageClass = 'alert alert-success fade in';
        this.message = data.message;
        this.getAllPosts();
        this.editForm.reset();
      }
    });
  }

  loadDeletePost(id){

    this.deletePostId = id;
  }

  loadEditPost(id){

    this.postService.getPost(id).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger fade in';
        this.message = data.message;
        this.editPostContent = undefined;
        this.editPostId = undefined;

      }else{
        this.editPostContent = data.post.content;
        this.editPostId = data.post._id;
      }
    })

  }


  postAnswer(id) {
    const answer = this.answerForm.get('answer').value;
    this.postService.postAnswer(id, answer).subscribe(data => {
      this.getAllPosts();
      this.answerForm.reset();
      this.operations = true;
      this.messageClass = 'alert alert-success fade in';
      this.message = data.message;
    });
  }


  toggleAnswerDiv(id){

    if(!this.viewAnswers.includes(id)){
    this.viewAnswers.push(id);
    this.answerForm.reset();
    }else{
      const index = this.viewAnswers.indexOf(id);
      this.viewAnswers.splice(index, 1);
      this.answerForm.reset();
    }


  }





  ngOnInit() {


    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.name;
      this.loginId = profile.user.loginId;
    });

    this.getAllPosts();


  }
}
