import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.css']
})
export class TaskHomeComponent implements OnInit {

  taskId;
  task
  members;

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute) { 
    this.task = 0;
  }

  loadSingletask(taskId){

    this.taskService.getSingleTask(taskId.id).subscribe(data =>{
      this.task = data.task[0];
    });
  }

  ngOnInit() {

    this.taskId = this.activatedRoute.snapshot.params;
    this.loadSingletask(this.taskId);

  }

}
