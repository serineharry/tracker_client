import { Component, OnInit, animate, Directive, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../model/task';
import { Schedule } from '../model/schedule';
import * as moment from 'moment/moment';
import { Resource } from '../model/resource';
import { GlobalConfig } from '../global-config';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../task-search/task.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  providers: [TaskService]
})

export class TaskDetailsComponent implements OnInit {

  task = new Task();
  schedule = new Schedule();
  statusArr = [];
  toggleSection = 'task';
  taskUpdateInProgress = false;
  createOrUpdate = 'Create';
  companyAdmin;

  htmlDateFormat;
  userDateFormat;

  errorMessage;


  constructor(private globalSvc: GlobalService, private router: Router, private route: ActivatedRoute,
    private taskSvc: TaskService, private location: Location) {
    this.htmlDateFormat = this.globalSvc.getHtmlDefaultFormat();
    this.userDateFormat = this.globalSvc.getDateFormat();
  }

  ngOnInit() {

    this.task.taskId = this.route.snapshot.params['id'];
    this.task.applicationId = this.globalSvc.getApplication().applicationId;
    this.companyAdmin = this.globalSvc.getApplicationAdminPermission();

    this.statusArr = this.globalSvc.getStatusArr();

    if (this.task.taskId && this.task.taskId > 0) {

      this.createOrUpdate = 'Update';

      this.taskSvc.getTask(this.task.taskId)
        .subscribe(
        task => {
          this.task = task;
          this.assignTaskDateOnSchedule();
        },
        err => {
          this.errorMessage = 'Fetch error ' + GlobalConfig.parseException(err);
          console.log('Task fetch error', err);
        }
        );
    }
  }

  assignTaskDateOnSchedule() {
    console.log('task-detail', 'assignTaskDateOnSchedule');

    this.schedule.startDate = this.task.startDate;
    this.schedule.endDate = moment(this.task.endDate).format(this.htmlDateFormat);
  }

  assignSchedule(schedule: Schedule) {
    this.toggleSection = 'task';
    this.task.scheduleId = schedule.scheduleId;
    this.task.userstory = schedule.userstory;
    this.task.projectUid = schedule.projectUid;

  }
  clearSchedule() {
    this.task.scheduleId = null;
    this.task.userstory = '';
    this.task.projectUid = '';

  }

  assignResource(resource: Resource) {
    this.toggleSection = 'task';
    this.task.userId = resource.userId;
    this.task.userName = resource.username;
    this.task.firstName = resource.firstName;
    this.task.lastName = resource.lastName;
  }
  clearResource() {
    this.task.userId = null;
    this.task.userName = '';
  }

  updateTask(formValid: boolean, formDirty: boolean) {

    console.log('formValid', formValid, 'formDirty', formDirty);

    if (!formDirty) {
      return;
    }

    if (!formValid) {
      this.errorMessage = 'Mandatory Fields are missing';
      return;
    }

    if (!this.task.userId) {
      this.errorMessage = 'Please assign task owner';
      return;
    }

    this.taskUpdateInProgress = true;
    this.task.applicationId = this.globalSvc.getApplication().applicationId;

    if (this.task.taskId > 0) {
      this.taskSvc.updateTask(this.task)
        .subscribe(
        taskResp => {
          this.task = taskResp;
          if (this.task.taskId > 0) {
            this.createOrUpdate = 'Update';
          }
          console.log(this.task);
          this.taskUpdateInProgress = false;

        },
        err => {
          console.log('Update Exception', err);
          this.taskUpdateInProgress = false;
          this.errorMessage = 'Update error ' + GlobalConfig.parseException(err);
        }
        );
    } else {
      this.taskSvc.addTask(this.task)
        .subscribe(
        taskResp => {
          this.task = taskResp;
          if (this.task.taskId > 0) {
            this.createOrUpdate = 'Update';
          }
          console.log(this.task);
          this.taskUpdateInProgress = false;

        },
        err => {
          console.log('Create Exception', err);
          this.taskUpdateInProgress = false;
          this.errorMessage = 'Create error ' + GlobalConfig.parseException(err);
        }
        );
    }
  }

  goBack() {
    this.location.back();
  }

}
