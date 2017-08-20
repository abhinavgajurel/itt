import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { BugService } from '../../services/bug.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projects;
  username;
  loginId;
  tasks;
  bugs;

  constructor(private projectService : ProjectService, private authService : AuthService,
  private bugService : BugService , private taskService : TaskService  ) {
    this.projects = 0;
   }

  loadAllProjects(){
    this.projectService.loadAllProjects(this.loginId).subscribe(project =>{
      this.projects = project.projects;
    })

  }

   loadAllTasks(){
    this.taskService.loadAllTasks(this.loginId).subscribe(task =>{
      this.tasks = task.task;
    })

  }

   loadAllBugss(){
    this.bugService.loadAllBugs(this.loginId).subscribe(bug =>{
      this.bugs = bug.bug;
    })

  }
  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.name;
      this.loginId = profile.user.loginId;
      this.loadAllProjects();
      this.loadAllBugss();
      this.loadAllTasks();
    });

    

  }

}
