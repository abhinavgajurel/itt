import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
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

  constructor(private projectService : ProjectService, private authService : AuthService) { }

  loadAllProjects(){
    this.projectService.loadAllProjects(this.loginId).subscribe(project =>{
      this.projects = project.projects;
    })

  }
  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.name;
      this.loginId = profile.user.loginId;
      this.loadAllProjects();
    });

    

  }

}
