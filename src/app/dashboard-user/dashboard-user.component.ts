import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DashboardService } from '../common_services/dashboard.service';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { Task } from '../model/task';
import { TaskService } from '../task-search/task.service';
import { GlobalConfig } from '../global-config';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css'],
  providers: [DashboardService, TaskService]
})
export class DashboardUserComponent implements OnInit {

  assignedTasks: Task[] = [];
  missedTasks: Task[] = [];
  userDateFormat = this.globalSvc.getDateFormat();
  errorMessage;
  missedTaskLoadInProgress = false;
  assignedTaskLoadInProgress = false;


  constructor(private globalSvc: GlobalService, private router: Router, private dashBoardSvc: DashboardService,
    private taskSvc: TaskService) { }

  ngOnInit() {

    let task = new Task();
    task.applicationId = this.globalSvc.getApplication().applicationId;
    task.userId = this.globalSvc.getUser().userId;

    this.missedTaskLoadInProgress = true;
    this.dashBoardSvc.getUserMissedTask(task)
      .subscribe(
      taskListResp => {
        this.missedTasks = taskListResp;
        this.missedTaskLoadInProgress = false;
      },
      err => {
        console.log('dashboard missed task fetch error', err);
        this.missedTaskLoadInProgress = false;
        this.displayError('dashboard missed task fetch error' + GlobalConfig.parseException(err));
      }
      );

    this.assignedTaskLoadInProgress = true;

    this.dashBoardSvc.getUserTask(task)
      .subscribe(
      taskListResp => {
        this.assignedTasks = taskListResp;
        this.assignedTaskLoadInProgress = false;
      },
      err => {
        console.log('dashboard task fetch error', err);
        this.assignedTaskLoadInProgress = false;
        this.displayError('dashboard task fetch error' + GlobalConfig.parseException(err));
      }
      );



    console.log('dashboard-user', 'on init');
  }

  markTaskStatus(task: Task, newStatus: string, source: string) {
    task.status = newStatus;

    this.taskSvc.updateTask(task)
      .subscribe(
      taskResp => {

        if (newStatus === 'Completed') {
          if (source === 'missedTask') {
            console.log('Inside missed Task');
            this.missedTasks = this.missedTasks.filter(filter => filter.taskId !== taskResp.taskId);
          } else if (source === 'assignedTask') {
            console.log('Inside assigned Task');
            this.assignedTasks = this.assignedTasks.filter(filter => filter.taskId !== taskResp.taskId);
          }
        }
        console.log('developer-dashboard', taskResp);
      },
      err => {
        console.log('Update Exception', err);
        this.displayError('Update Exception' + GlobalConfig.parseException(err));

      }
      );


  }

  displayError(errMsg: string) {
    this.errorMessage = errMsg;
    setTimeout(function () {
      this.errorMessage = null;
    }.bind(this), 3000);
  }

}
