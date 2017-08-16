import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  members;
  newProjectForm;

  constructor(private location : Location, private projectService: ProjectService, private formBuilder: FormBuilder,) { 

    this.newProjectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required]
    });

  }

  goBack() {
    this.location.back();
  }

  getAllMembers(){

    this.projectService.getAllMembers().subscribe(users => {

      if(users.success == false){
        this.members = '';
      }else{
      this.members = users.users;
      }
    });
  }


  ngOnInit() {

    this.getAllMembers();
  }

}
