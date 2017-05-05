import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { DashboardService } from '../common_services/dashboard.service';
import { TaskService } from '../task-search/task.service';
import { Task } from '../model/task';
import { GlobalConfig } from '../global-config';

@Component({
  selector: 'app-dashboard-application',
  templateUrl: './dashboard-application.component.html',
  styleUrls: ['./dashboard-application.component.css'],
  providers: [DashboardService, TaskService]
})
export class DashboardApplicationComponent implements OnInit {

  assignedTasks: Task[] = [];
  missedTasks: Task[] = [];
  userDateFormat = this.globalSvc.getDateFormat();

  errorMessage;
  missedTaskLoadInProgress = false;
  assignedTaskLoadInProgress = false;

  constructor(private globalSvc: GlobalService, private router: Router, private dashBoardSvc: DashboardService,
    private taskSvc: TaskService) { }

  ngOnInit() {

    let applicationId = this.globalSvc.getApplication().applicationId;

    console.log('dashboard-app', 'application id', applicationId);

    this.missedTaskLoadInProgress = true;
    this.dashBoardSvc.getApplicationMissedTask(applicationId)
      .subscribe(
      taskListResp => {
        this.missedTasks = taskListResp;
        this.missedTaskLoadInProgress = false;
      },
      err => {
        console.log('dashboard missed task fetch error', err);
        this.missedTaskLoadInProgress = false;
        this.errorMessage = 'dashboard missed task fetch error ' + GlobalConfig.parseException(err);
      }
      );

    this.assignedTaskLoadInProgress = true;
    this.dashBoardSvc.getApplicationTask(applicationId)
      .subscribe(
      taskListResp => {
        this.assignedTasks = taskListResp;
        this.assignedTaskLoadInProgress = false;
      },
      err => {
        console.log('dashboard task fetch error', err);
        this.assignedTaskLoadInProgress = false;
        this.errorMessage = 'dashboard task fetch error ' + GlobalConfig.parseException(err);
      }
      );

  }

  markTaskStatus(task: Task, newStatus: string, source: string) {
    task.status = newStatus;

    this.taskSvc.updateTask(task)
      .subscribe(
      taskResp => {

        if (newStatus === 'Completed') {
          if (source === 'missedTask') {
            this.missedTasks = this.missedTasks.filter(filter => filter.taskId !== taskResp.taskId);
          } else if (source === 'assignedTask') {
            this.assignedTasks = this.assignedTasks.filter(filter => filter.taskId !== taskResp.taskId);
          }
        }
        console.log('dashboard-application', taskResp);

      },
      err => {
        console.log('Update Exception', err);
        this.errorMessage = 'Update Exception ' + GlobalConfig.parseException(err);
      }
      );


  }

}
