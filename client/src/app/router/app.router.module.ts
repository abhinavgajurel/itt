import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent} from '../components/home/home.component';
import { RegisterComponent} from '../components/register/register.component';
import { LoginComponent} from '../components/login/login.component';
import { DashboardComponent} from '../components/dashboard/dashboard.component';
import { NewProjectComponent} from '../components/new-project/new-project.component';
import { ProjectHomeComponent} from '../components/project-home/project-home.component';
import { TaskHomeComponent} from '../components/task/task-home/task-home.component';
import { AuthGuard } from '../guards/auth.guard';
import { NewTaskComponent} from '../components/task/new-task/new-task.component';
import { NewBugComponent} from '../components/bug/new-bug/new-bug.component';
import { BugHomeComponent} from '../components/bug/bug-home/bug-home.component';




const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component : DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newproject',
    component : NewProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projectHome/:id',
    component: ProjectHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newTask',
    component: NewTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'taskHome/:id',
    component: TaskHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newBug',
    component: NewBugComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bugHome/:id',
    component: BugHomeComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRouterModule { }
