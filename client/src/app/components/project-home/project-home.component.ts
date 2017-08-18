import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.css']
})
export class ProjectHomeComponent implements OnInit {

  projectId;
  project
  members;

  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) { 
    this.project = 0;
  }

  loadSingleProject(projectId){

    this.projectService.getSingleProject(projectId.id).subscribe(data =>{
      this.project = data.project[0];
      this.loadProjectMembers();
    });
  }

  loadProjectMembers(){
   
    this.projectService.getAllMembers().subscribe(users => {

      if (users.success == false) {
        this.members = '';
      } else {
        this.members = users.users;
      }
    });

  }

  ngOnInit() {

    this.projectId = this.activatedRoute.snapshot.params;
    this.loadSingleProject(this.projectId);

  }

}
