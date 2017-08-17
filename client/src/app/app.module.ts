import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRouterModule } from './router/app.router.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { ProjectService } from './services/project.service';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TimelineComponent } from './components/dashboard/timeline/timeline.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectHomeComponent } from './components/project-home/project-home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    TimelineComponent,
    NewProjectComponent,
    ProjectHomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule
  ],
  providers: [AuthService,PostService,ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
