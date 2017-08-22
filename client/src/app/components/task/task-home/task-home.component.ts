import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { ProjectService } from '../../../services/project.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.css']
})
export class TaskHomeComponent implements OnInit {

  taskId;
  task
  members;
  editTaskForm;
  editTask;
  messageClass;
  message;

  constructor(private taskService: TaskService, private projectService: ProjectService , private activatedRoute: ActivatedRoute, private formBuilder : FormBuilder) { 
    this.task = 0;
    this.editTask = 0;

    this.editTaskForm = this.formBuilder.group({
      editTaskName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],

      editTaskDescription: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],

      editStartDate: ['', Validators.compose([
        Validators.required,
      ])],

      editDueDate: ['', Validators.compose([
        Validators.required,
      ])],

      editPerDone: ['', Validators.compose([
        Validators.required,
      ])],
      
      editEstimatedTime: ['', Validators.compose([
        Validators.required,
      ])],

      editPriority: ['', Validators.compose([
        Validators.required,
      ])],

      editStatus: ['', Validators.compose([
        Validators.required,
      ])],

      editAssignee: ['', Validators.compose([
        Validators.required,
      ])]

    });

  }

  loadEditTask(){

    this.taskService.getSingleTask(this.activatedRoute.snapshot.params.id).subscribe(data =>{
      this.editTask = data.task[0];
    });

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

  loadSingletask(taskId){

    this.taskService.getSingleTask(taskId.id).subscribe(data =>{
      this.task = data.task[0];
    });
  }

  updateTask(){

      const editTask = {
        _id: this.activatedRoute.snapshot.params,
      name: this.editTaskForm.get('editTaskName').value,
      description: this.editTaskForm.get('editTaskDescription').value,
      startDate: this.editTaskForm.get('editStartDate').value,
      dueDate: this.editTaskForm.get('editDueDate').value,
      perDone: this.editTaskForm.get('editPerDone').value,
      estimatedTime: this.editTaskForm.get('editEstimatedTime').value,
      priority: this.editTaskForm.get('editPriority').value,
      status: this.editTaskForm.get('editStatus').value,
      assignee: this.editTaskForm.get('editAssignee').value

    }

    this.taskService.updateTask(editTask).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger fade in';
        this.message = data.message;
        this.editTaskForm.reset();
      } else {
        this.messageClass = 'alert alert-success fade in';
        this.message = data.message;
        this.loadSingletask(this.taskId);
        // this.editTaskForm.reset();
      }
    });

  }

  ngOnInit() {

    this.getAllMembers();
    this.taskId = this.activatedRoute.snapshot.params;
    this.loadSingletask(this.taskId);

  }

}
