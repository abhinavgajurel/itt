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
import { TaskService } from './services/task.service';
import { BugService } from './services/bug.service';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TimelineComponent } from './components/dashboard/timeline/timeline.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectHomeComponent } from './components/project-home/project-home.component';
import { AuthGuard } from './guards/auth.guard';
import { NewTaskComponent } from './components/task/new-task/new-task.component';
import { TaskHomeComponent } from './components/task/task-home/task-home.component';
import { NewBugComponent } from './components/bug/new-bug/new-bug.component';
import { BugHomeComponent } from './components/bug/bug-home/bug-home.component';


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
    NewTaskComponent,
    TaskHomeComponent,
    NewBugComponent,
    BugHomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule
  ],
  providers: [AuthService, PostService, ProjectService, AuthGuard, TaskService,BugService],
  bootstrap: [AppComponent]
})
export class AppModule { }
