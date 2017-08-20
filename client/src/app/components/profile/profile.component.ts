import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = '';
  email = '';
  loginId = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.name;
      this.email = profile.user.email;
      this.loginId = profile.user.loginId;
    });
  }

}