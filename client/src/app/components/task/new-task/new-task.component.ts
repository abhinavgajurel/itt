import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  newTaskForm;
  members;
  username;
  loginId;
  messageClass;
  message;

  constructor(private formBuilder : FormBuilder, private location :Location, private projectService : ProjectService,
  private authService : AuthService, private router :Router, private taskService : TaskService) {

this.newTaskForm = this.formBuilder.group({
      taskName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],

      taskDescription: ['', Validators.compose([
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

  createNewTask(){

     const task = {
      name: this.newTaskForm.get('taskName').value,
      description: this.newTaskForm.get('taskDescription').value,
      createdBy: this.username,
      createdLoginId: this.loginId,
      startDate: this.newTaskForm.get('startDate').value,
      dueDate: this.newTaskForm.get('dueDate').value,
      perDone: this.newTaskForm.get('perDone').value,
      estimatedTime: this.newTaskForm.get('estimatedTime').value,
      priority: this.newTaskForm.get('priority').value,
      status: this.newTaskForm.get('status').value,
      assignee: this.newTaskForm.get('assignee').value

    }

    this.taskService.createNewTask(task).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message.message;
      } else {
        this.messageClass = 'alert alert-success'; 
        this.message = data.message; 
        setTimeout(() => {
          this.router.navigate(['/taskHome/' + data.data._id]); 
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
