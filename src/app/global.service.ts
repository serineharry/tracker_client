import { Injectable } from '@angular/core';
import { Application } from './model/application';
import { User } from './model/user';

@Injectable()
export class GlobalService {

  private user: User = new User();
  private application: Application = new Application();
  private dateFormat = 'MM/dd/yyyy';
  private htmlDefaultFormat = 'YYYY-MM-DD';
  private projectType = ['Agile', 'Waterfall', 'Blend'];
  private projectPhase = ['HLD', 'AD', 'Dev', 'Test'];
  private status = ['Active', 'Inactive', 'In progress', 'Completed'];
  nonAdminSingleAppUser = false;


  constructor() {
    // this.user.userId = 1;
    // this.application.applicationId = 1;
  }

  getUser() {
    return this.user;
  }

  // sets after initial login
  setUser(user: User) {
    this.user = user;
  }
  getApplication(): Application {
    return this.application;
  }
  // sets after Selecting application from application component
  setApplication(app: Application) {
    this.application = app;
  }
  getProjectTypeArr(): string[] {
    return this.projectType;
  }
  setProjectTypeArr(projType: string[]) {
    this.projectType = projType;
  }

  getProjectPhaseArr(): string[] {
    return this.projectPhase;
  }
  setProjectPhaseArr(projectPhase: string[]) {
    this.projectPhase = projectPhase;
  }



  getStatusArr(): string[] {
    return this.status;
  }
  setStatusArr(status: string[]) {
    this.status = status;
  }

  getDateFormat(): string {
    return this.dateFormat;
  }

  setDateFormat(dateFormat: string) {
    this.dateFormat = dateFormat;
  }

  getHtmlDefaultFormat(): string {
    return this.htmlDefaultFormat;
  }


  // sets from Application component
  setNonAdminSingleUser(nonAdmSingleAppUser: boolean) {
    this.nonAdminSingleAppUser = nonAdmSingleAppUser;
  }
  // uses on Dashboard
  getNonAdminSingleAppUser(): boolean {
    return this.nonAdminSingleAppUser;
  }


  getApplicationAdminPermission(): boolean {

    if (this.user) {
      return true;
    }

    if (this.user.globalAdmin === 1) {
      return true;
    }

    let app_roles = this.application.roles;

    if (app_roles) {
      let index = app_roles.findIndex(filter => (filter.role.endsWith('Manager')
        || filter.role.endsWith('Lead') || filter.role.endsWith('Scrum Master')));

      if (index > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }



}
