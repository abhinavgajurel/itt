import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  members;
  newProjectForm;
  selectedMembers = [];
  messageClass;
  message;
  username;
  loginId;

  constructor(private location: Location, private projectService: ProjectService, private router: Router,
     private authService: AuthService, private formBuilder: FormBuilder, ) {

    this.newProjectForm = this.formBuilder.group({
      projectName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],
      projectDescription: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],

      selectedMembers: ['', Validators.compose([
        Validators.required,
      ])]
    });
  }

  // memberValidator() {
  //   const numberOfMembers = this.selectedMembersLength;
  //   if (numberOfMembers) {
  //     return null;
  //   } else {
  //     return { 'memberValidation': true }
  //   }
  // }


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

  updateMembers(member, event) {
    if (event.target.checked) {
      this.selectedMembers.push(member.loginId);
    } else {
      const memberIndex = this.selectedMembers.indexOf(member.loginId);
      this.selectedMembers.splice(memberIndex, 1);
    }
  }

  createNewProject() {

    const project = {
      projectName: this.newProjectForm.get('projectName').value,
      projectDescription: this.newProjectForm.get('projectDescription').value,
      selectedMembers: this.selectedMembers,
      createdBy: this.username,
      createdLoginId: this.loginId
    }

    this.projectService.createNewProject(project).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success'; 
        this.message = data.message; 
        setTimeout(() => {
          this.router.navigate(['/projectHome/' + data.data._id]); 
        }, 2000);
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
