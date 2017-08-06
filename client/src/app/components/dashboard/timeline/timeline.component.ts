import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService} from '../../../services/post.service';
import { AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  posting = false;
  form;
  username;
  messageClass;
  message;
  posts;


  constructor( private authService : AuthService, private postService : PostService, private formBuilder : FormBuilder) { 
    
    // this.form = new FormGroup({
    //   content : new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.maxLength(100)
    //   ]))
    // });

  this.form = this.formBuilder.group({
      content: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
      ])]
    });
  };

  onPostSubmit() {
    this.posting = true;

    const post = {
      content: this.form.get('content').value,
      createdBy: this.username
    }

    // Function to save blog into database
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
    });
  }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.name;
    });

    this.getAllPosts();
  }
}
