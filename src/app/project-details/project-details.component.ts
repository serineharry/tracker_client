import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Project } from '../model/project';
import { ProjectService } from '../project-search/project.service';
import { GlobalService } from '../global.service';
import { GlobalConfig } from '../global-config';
import * as moment from 'moment/moment';
import { Schedule } from '../model/schedule';
import { Resource } from '../model/resource';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [ProjectService]
})
export class ProjectDetailsComponent implements OnInit {

  projectUpdateInProgress = false;
  errorMessage: string;
  userDateFormat = this.globalSvc.getDateFormat();

  project = new Project();
  projectTypeArr: string[];
  createOrUpdate = 'Create';
  companyAdmin;
  statusColor = '';


  constructor(private router: Router, private route: ActivatedRoute, private projSvc: ProjectService,
    private globalSvc: GlobalService) { }

  ngOnInit() {
    this.project.projectId = this.route.snapshot.params['id'];
    this.project.applicationId = this.globalSvc.getApplication().applicationId;
    this.companyAdmin = this.globalSvc.getApplicationAdminPermission();

    this.projectTypeArr = this.globalSvc.getProjectTypeArr();

    if (this.project.projectId && this.project.projectId > 0) {
      this.createOrUpdate = 'Update';

      this.projSvc.getProject(this.project.projectId)
        .subscribe(
        project => {
          this.project = project;
        },
        err => {
          console.log('project fetch error', err);
          this.errorMessage = 'Update error ' + GlobalConfig.parseException(err);
        }
        );
    }
  }

  validateProject(project: Project) {

    console.log('focus out');

    if (this.project.projectId) {
      return;
    }
  }

  updateProject(formValid: boolean, formDirty: boolean) {

    if (!formDirty || !formValid) {
      return;
    }

    this.projectUpdateInProgress = true;

    if (this.project.projectId > 0) {
      this.projSvc.updateProject(this.project)
        .subscribe(
        project => {
          this.project = project;
          console.log(project);
          this.projectUpdateInProgress = false;

        },
        err => {
          console.log('Update Exception', err);
          this.projectUpdateInProgress = false;
          this.displayError('Update error ' + GlobalConfig.parseException(err));
        }
        );

    } else {
      this.projSvc.addProject(this.project)
        .subscribe(
        project => {
          this.project = project;
          this.createOrUpdate = 'Update';
          console.log(project);
          this.projectUpdateInProgress = false;

        },
        err => {
          console.log('add Exception', err);
          this.projectUpdateInProgress = false;
          this.displayError('Add error ' + GlobalConfig.parseException(err));
        }
        );

    }
  }

  displayError(errMsg: string) {
    this.errorMessage = errMsg;
    setTimeout(function () {
      this.errorMessage = null;
    }.bind(this), 3000);
  }

  changeBackgroundStyle() {

    if (this.project.projectStatus === 'Green') {
      this.statusColor = 'red';
    } else if (this.project.projectStatus === 'Yellow') {
      this.statusColor = 'blue';
    } else if (this.project.projectStatus === 'Red') {
      this.statusColor = 'green';
    } else {
      this.statusColor = '';
    }

  }


}
