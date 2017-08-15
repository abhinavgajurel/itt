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
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TimelineComponent } from './components/dashboard/timeline/timeline.component';

import {MdSnackBar} from '@angular/material';
import {OVERLAY_PROVIDERS} from '@angular/material';
import {ScrollStrategyOptions} from '@angular/material';
import {ScrollDispatcher} from '@angular/material';
import {Platform} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    TimelineComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule
  ],
  providers: [AuthService,PostService, MdSnackBar, OVERLAY_PROVIDERS, ScrollStrategyOptions,ScrollDispatcher, Platform],
  bootstrap: [AppComponent]
})
export class AppModule { }
