import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BugService } from '../../../services/bug.service';
import { ProjectService } from '../../../services/project.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-bug-home',
  templateUrl: './bug-home.component.html',
  styleUrls: ['./bug-home.component.css']
})
export class BugHomeComponent implements OnInit {

  bugId;
  bug
  members;
  editBugForm;
  editBug;
  messageClass;
  message;

  constructor(private bugService: BugService, private projectService: ProjectService , private activatedRoute: ActivatedRoute, private formBuilder : FormBuilder) { 
    this.bug = 0;
    this.editBug = 0;

    this.editBugForm = this.formBuilder.group({
      editBugName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],

      editBugDescription: ['', Validators.compose([
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

  loadEditBug(){

    this.bugService.getSingleBug(this.activatedRoute.snapshot.params.id).subscribe(data =>{
      this.editBug = data.bug[0];
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

  loadSingleBug(bugId){

    this.bugService.getSingleBug(bugId.id).subscribe(data =>{
      this.bug = data.bug[0];
    });
  }

  updateBug(){

      const editBug = {
        _id: this.activatedRoute.snapshot.params,
      name: this.editBugForm.get('editBugName').value,
      description: this.editBugForm.get('editBugDescription').value,
      startDate: this.editBugForm.get('editStartDate').value,
      dueDate: this.editBugForm.get('editDueDate').value,
      perDone: this.editBugForm.get('editPerDone').value,
      estimatedTime: this.editBugForm.get('editEstimatedTime').value,
      priority: this.editBugForm.get('editPriority').value,
      status: this.editBugForm.get('editStatus').value,
      assignee: this.editBugForm.get('editAssignee').value

    }

    this.bugService.updateBug(editBug).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger fade in';
        this.message = data.message;
        // this.editBugForm.reset();
      } else {
        this.messageClass = 'alert alert-success fade in';
        this.message = data.message;
        this.loadSingleBug(this.bugId);
        // this.editbugForm.reset();
      }
    });

  }

  ngOnInit() {

    this.getAllMembers();
    this.bugId = this.activatedRoute.snapshot.params;
    this.loadSingleBug(this.bugId);

  }

}
