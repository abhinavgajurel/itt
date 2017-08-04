import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent} from '../components/home/home.component';
import { RegisterComponent} from '../components/register/register.component';
import { LoginComponent} from '../components/login/login.component';
import { DashboardComponent} from '../components/dashboard/dashboard.component';



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
    component : DashboardComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRouterModule { }
