import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projects;

  constructor(private projectService : ProjectService) { }

  loadAllProjects(){
    this.projectService.loadAllProjects().subscribe(project =>{
      this.projects = project.projects;
    })

  }
  ngOnInit() {

    this.loadAllProjects();

  }

}
