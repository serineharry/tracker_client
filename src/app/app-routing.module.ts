import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ApplicationComponent } from './application/application.component';
// import { AuthguardService } from './app_services/authguard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SearchComponent } from './search/search.component';
import { TaskSearchComponent } from './task-search/task-search.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './common_services/auth-guard.service';
import { DashboardApplicationComponent } from './dashboard-application/dashboard-application.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { ReminderDetailsComponent } from './reminder-details/reminder-details.component';
import { ReminderSearchComponent } from './reminder-search/reminder-search.component';


/*const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'userform', component: UserformComponent },
  { path: 'dataload', component: DataloadComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'dashboarduserlist', component: UserlistComponent, canActivate: [AuthguardService] },
      { path: 'dashboardlogin', component: LoginComponent, canActivate: [AuthguardService] },
      { path: 'dashboarduserform', component: UserformComponent, canActivate: [AuthguardService] },
      { path: '', component: UserlistComponent, canActivate: [AuthguardService] },

    ],
    canActivate: [AuthguardService]
  },
  { path: 'userinfo', component: UserlistComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
*/
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'application', component: ApplicationComponent, canActivate: [AuthGuardService] },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService],
        children: [
            { path: 'dashboard-user', component: DashboardUserComponent, },
            { path: 'dashboard-app', component: DashboardApplicationComponent, },
            { path: 'project', component: ProjectSearchComponent, canActivate: [AuthGuardService] },
            { path: 'project/:id', component: ProjectDetailsComponent, canActivate: [AuthGuardService] },
            { path: 'task', component: TaskSearchComponent, canActivate: [AuthGuardService] },
            { path: 'task/:id', component: TaskDetailsComponent, canActivate: [AuthGuardService] },
            { path: 'user', component: UserSearchComponent, canActivate: [AuthGuardService] },
            { path: 'reminder', component: ReminderSearchComponent, canActivate: [AuthGuardService] },
            { path: 'reminder/:id', component: ReminderDetailsComponent, canActivate: [AuthGuardService] },
            { path: 'user/:id', component: UserDetailsComponent, canActivate: [AuthGuardService] },
            { path: '', component: DashboardComponent, canActivate: [AuthGuardService] }

        ]
    },
    { path: 'project', component: ProjectSearchComponent, canActivate: [AuthGuardService] },
    { path: 'reminder', component: ReminderDetailsComponent },
    { path: 'project/:id', component: ProjectDetailsComponent, canActivate: [AuthGuardService] },
    { path: 'task', component: TaskSearchComponent, canActivate: [AuthGuardService] },
    { path: 'task/:id', component: TaskDetailsComponent, canActivate: [AuthGuardService] },
    { path: 'search', component: SearchComponent, canActivate: [AuthGuardService] },
    { path: '', redirectTo: '/tracker/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
