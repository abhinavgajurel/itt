import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { BugService } from '../../../services/bug.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-new-bug',
  templateUrl: './new-bug.component.html',
  styleUrls: ['./new-bug.component.css']
})
export class NewBugComponent implements OnInit {

  newbugForm;
  members;
  username;
  loginId;
  messageClass;
  message;

  constructor(private formBuilder : FormBuilder, private location :Location, private projectService : ProjectService,
  private authService : AuthService, private router :Router, private bugService : BugService) {

this.newbugForm = this.formBuilder.group({
      bugName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],

      bugDescription: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],

      startDate: ['', Validators.compose([
        Validators.required,
      ])],

      dueDate: ['', Validators.compose([
        Validators.required,
      ])],

      perDone: ['', Validators.compose([
        Validators.required,
      ])],
      
      estimatedTime: ['', Validators.compose([
        Validators.required,
      ])],

      priority: ['', Validators.compose([
        Validators.required,
      ])],

      status: ['', Validators.compose([
        Validators.required,
      ])],

      assignee: ['', Validators.compose([
        Validators.required,
      ])]

    });
  }

  createNewBug(){

     const bug = {
      name: this.newbugForm.get('bugName').value,
      description: this.newbugForm.get('bugDescription').value,
      createdBy: this.username,
      createdLoginId: this.loginId,
      startDate: this.newbugForm.get('startDate').value,
      dueDate: this.newbugForm.get('dueDate').value,
      perDone: this.newbugForm.get('perDone').value,
      estimatedTime: this.newbugForm.get('estimatedTime').value,
      priority: this.newbugForm.get('priority').value,
      status: this.newbugForm.get('status').value,
      assignee: this.newbugForm.get('assignee').value

    }

    this.bugService.createNewbug(bug).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message.message;
      } else {
        this.messageClass = 'alert alert-success'; 
        this.message = data.message; 
        setTimeout(() => {
          this.router.navigate(['/bugHome/' + data.data._id]); 
        }, 2000);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  getAllMembers() {

    this.projectService.getAllMembers().subscribe(users => {

      if (users.success == false) {
        this.members = '';
      } else {
        this.members = users.users;
      }
    });
  }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.name;
      this.loginId = profile.user.loginId;
    });

    this.getAllMembers();
  }

}
