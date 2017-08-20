import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BugService } from '../../../services/bug.service';

@Component({
  selector: 'app-bug-home',
  templateUrl: './bug-home.component.html',
  styleUrls: ['./bug-home.component.css']
})
export class BugHomeComponent implements OnInit {

  bugId;
  bug
  members;

  constructor(private bugService: BugService, private activatedRoute: ActivatedRoute) { 
    this.bug = 0;
  }

  loadSinglebug(bugId){

    this.bugService.getSingleBug(bugId.id).subscribe(data =>{
      this.bug = data.bug[0];
    });
  }

  ngOnInit() {

    this.bugId = this.activatedRoute.snapshot.params;
    this.loadSinglebug(this.bugId);

  }

}
