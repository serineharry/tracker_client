import 'hammerjs';

import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Directive } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, RouterStateSnapshot } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '@angular/material';

import { GlobalService } from './global.service';
import { AppComponent } from './app.component';
import { ApplicationComponent } from './application/application.component';
import { LoginComponent } from './login/login.component';
import { MessageboxComponent } from './messagebox/messagebox.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { ButtonComponent } from './button/button.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

import * as moment from 'moment/moment';
import { SearchComponent } from './search/search.component';
import { UserstorySearchComponent } from './userstory-search/userstory-search.component';
import { UserstoryDetailsComponent } from './userstory-details/userstory-details.component';
import { UseDateFormatDirective } from './directives/use-date-format.directive';
import { TitleCasePipe } from './directives/title-case.pipe';
import { RegisterFormModelDirective } from './directives/register-form-model.directive';
import { ResourceComponent } from './resource/resource.component';
import { TaskSearchComponent } from './task-search/task-search.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { ScheduleSearchComponent } from './schedule-search/schedule-search.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DashboardApplicationComponent } from './dashboard-application/dashboard-application.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './common_services/auth-guard.service';
import { AuthenticationService } from './common_services/authentication.service';
import { TrackerAlertComponent } from './tracker-alert/tracker-alert.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { TextareaComponent } from './textarea/textarea.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { ReminderDetailsComponent } from './reminder-details/reminder-details.component';
import { ReminderSearchComponent } from './reminder-search/reminder-search.component';
import { LoadingComponent } from './loading/loading.component';
import { MessageboxService } from './messagebox/messagebox.service';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    LoginComponent,
    MessageboxComponent,
    DashboardComponent,
    ProjectSearchComponent,
    ButtonComponent,
    ProjectDetailsComponent,
    UseDateFormatDirective,
    SearchComponent,
    TitleCasePipe,
    ResourceComponent,
    TaskSearchComponent,
    TaskDetailsComponent,
    ScheduleSearchComponent,
    DashboardUserComponent,
    DashboardApplicationComponent,
    PageNotFoundComponent,
    TrackerAlertComponent,
    UserDetailsComponent,
    InputComponent,
    RegisterFormModelDirective,
    SelectComponent,
    TextareaComponent,
    UserSearchComponent,
    ReminderDetailsComponent,
    ReminderSearchComponent,
    LoadingComponent,
    UserstorySearchComponent,
    UserstoryDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [Title, GlobalService, AuthGuardService, AuthenticationService, MessageboxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
