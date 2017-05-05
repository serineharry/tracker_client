import { Component, OnInit, OnChanges, Input, SimpleChange, Output, EventEmitter } from '@angular/core';
import { UserstoryService } from '../userstory-search/userstory.service';
import { GlobalService } from '../global.service';
import { Userstory } from '../model/userstory';
import { MessageModel } from '../messagebox/message-model';
import * as moment from 'moment/moment';
import { GlobalConfig } from '../global-config';
import { Resource } from '../model/resource';
import { FormGroup } from '@angular/forms';
import { Schedule } from '../model/schedule';

@Component({
  selector: 'app-userstory-details',
  templateUrl: './userstory-details.component.html',
  styleUrls: ['./userstory-details.component.css'],
  providers: [UserstoryService]
})
export class UserstoryDetailsComponent implements OnInit {

  @Input()
  projectId: number;

  @Input()
  invokingFrom = '';

  userstoryUpdateInProgress = false;
  userstoryUpdateErrorMessage: string;

  userDateFormat = this.globalSvc.getDateFormat();
  htmlDateFormat = this.globalSvc.getHtmlDefaultFormat();

  userstories: Userstory[] = [];

  selectedUserstory = new Userstory();
  selectedSchedule = new Schedule();
  messageModel = new MessageModel();

  companyAdmin;
  showResource = false;
  validPhases = this.globalSvc.getProjectPhaseArr();
  availPhases = [];


  constructor(private globalSvc: GlobalService, private schedSvc: UserstoryService) { }

  ngOnInit() {

    this.companyAdmin = this.globalSvc.getApplicationAdminPermission();
    if (this.invokingFrom === 'project') {
      this.fetchUserstoriesForProject();
    }

  }
  // ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

  //   console.log('userstory changes', changes);

  //   let simpleChange = changes['resource'];
  //   // no need to compare previous value. if i delete and add same user then won't work
  //   // if (simpleChange && simpleChange.currentValue !== simpleChange.previousValue) {
  //   this.assignOwnerOnResourceClick();
  //   // }
  // }

  fetchUserstoriesForProject() {

    this.schedSvc.getProjectUserstories(this.projectId)
      .subscribe(
      userstoryResp => {
        this.userstories = userstoryResp;
      },
      err => {
        console.log('project fetch error', err);
      }
      );

  }

  performSelectUserstory(event: Event, userstory: Userstory, formDirty: boolean) {

    let attrName: string = event.srcElement.getAttribute('name');
    // console.log('attrName', attrName);
    if (attrName === 'delBtn') {
      return;
    }

    if (formDirty && userstory.userstoryId !== this.selectedUserstory.userstoryId) {


    } else {
      this.proceedChangingUserStory(userstory);
    }

  }
  proceedChangingUserStory(userstory: Userstory) {

    // select the new row
    // console.log('userstory', 'selected userstory', userstory);
    // this.selectedUserstory = Object.assign({}, userstory);
    this.selectedUserstory = JSON.parse(JSON.stringify(userstory));

    if (this.selectedUserstory.schedules && this.selectedUserstory.schedules.length > 0) {
      this.selectedSchedule = this.selectedUserstory.schedules[0];
    }
    this.changeAvailPhaseDynamically();

    console.log(this.selectedUserstory);

  }

  changeAvailPhaseDynamically() {
    this.availPhases = JSON.parse(JSON.stringify(this.validPhases));
    for (let schedule of this.selectedUserstory.schedules) {

      if (schedule.phase !== this.selectedSchedule.phase) {

        let index = this.availPhases.indexOf(schedule.phase);
        console.log(index);
        if (index >= 0) {
          this.availPhases.splice(index, 1);
        }
        console.log(this.availPhases);

      }

    }
  }

  performScheduleSelect(schedule: Schedule) {
    this.selectedSchedule = schedule;
    this.changeAvailPhaseDynamically();

  }

  createUpdateUserstory(formValid: boolean, formDirty: boolean) {

    if (!formDirty || !formValid) {
      return;
    }

    console.log('perform update', this.selectedUserstory);
    if (this.selectedUserstory.userstoryId > 0) {
      // perform update
      this.userstoryUpdateInProgress = true;
      this.schedSvc.updateUserstory(this.selectedUserstory)
        .subscribe(
        userstory => {
          console.log(userstory);
          this.userstoryUpdateInProgress = false;

          let index = this.userstories.findIndex(filter => filter.userstoryId === userstory.userstoryId);
          if (index < 0) {
            this.userstories.push(userstory);
          } else {
            this.userstories[index] = userstory;
          }

        },
        err => {
          console.log('Update Exception', err);
          this.userstoryUpdateInProgress = false;
          this.userstoryUpdateErrorMessage = GlobalConfig.parseException(err);
        }
        );

    } else {
      // perform add
      this.userstoryUpdateInProgress = true;
      this.selectedUserstory.projectId = this.projectId;
      this.schedSvc.addUserstory(this.selectedUserstory)
        .subscribe(
        userstory => {
          console.log(userstory);
          this.userstoryUpdateInProgress = false;
          this.userstories.push(userstory);

        },
        err => {
          console.log('Update Exception', err);
          this.userstoryUpdateInProgress = false;
          this.userstoryUpdateErrorMessage = GlobalConfig.parseException(err);
        }
        );

    }

  }

  deleteUserstory(selectedUserstory: Userstory) {

    this.messageModel = new MessageModel();
    this.messageModel.message = 'are you sure you want to delete the userstory?';
    this.messageModel.operation = 'removeUserstory';
    this.messageModel.carryOver = selectedUserstory;

  }
  calculateDate(from: string) {

    if (this.selectedSchedule.days && this.selectedSchedule.startDate) {

      // let endDate = new Date();
      let endDate = (this.addWorkDays(new Date(this.selectedSchedule.startDate), this.selectedSchedule.days));

      this.selectedSchedule.endDate = endDate;
    }
  }

  addWorkDays(startDate: Date, days: number): string {

    let retDate = new Date(startDate);

    let isHoliday = true;
    // increment start date if it falls on weekend or on holiday
    while (isHoliday) {
      let dow = retDate.getUTCDay();
      // console.log(dow);
      if (dow === 6 || dow === 0) {
        retDate.setDate(retDate.getDate() + 1);
      } else {
        isHoliday = false;
      }
    }

    // set the interval
    for (let i = 1; i < days; i++) {
      retDate.setDate(retDate.getDate() + 1);

      isHoliday = true;
      // increment date if it falls on weekend or on holiday
      while (isHoliday) {
        let dow = retDate.getUTCDay();
        console.log(dow);
        if (dow === 6 || dow === 0) {
          retDate.setDate(retDate.getDate() + 1);
        } else {
          isHoliday = false;
        }
      }
    }

    console.log('return date', moment(retDate).utc().format(this.htmlDateFormat));

    return moment(retDate).utc().format(this.htmlDateFormat);
  }

  doMessageClick(event: any) {

    let whichButton = event.buttonClicked;
    let messageModel: MessageModel = event.messageModel;


    if (messageModel.operation === 'removeUserstory') {
      if (whichButton === 'Ok') {
        let userstoryToDelete: Userstory = messageModel.carryOver;
        this.schedSvc.deleteUserstory(userstoryToDelete.userstoryId)
          .subscribe(
          status => {
            // console.log(users);
            // set back to screen using user variable
            this.userstories = this.userstories.filter(filter => filter.userstoryId !== userstoryToDelete.userstoryId);
            // reset selected userstory
            this.selectedUserstory = new Userstory();
          },
          err => {
            console.log('Userstory deletion Exception', err);
          }
          );
      }
    }
  }

  assignOwnerOnResourceClick(selectedResource: Resource) {

    if (selectedResource) {

      if (!this.selectedSchedule.resources) {
        this.selectedSchedule.resources = [];
      }

      let index = this.selectedSchedule.resources.findIndex(filter => filter.userId === selectedResource.userId);

      // by default assume as add
      if (index >= 0) {
        console.log('assigning owner', 'changing status');
        this.selectedSchedule.resources[index].mode = 'ADDUPDATE';
      } else {
        this.selectedSchedule.resources.push(selectedResource);
      }
      console.log('assigning owner', selectedResource);
    }
  }

  deleteOwner(deleteResource: Resource, form: FormGroup) {

    // if already resides in database then update status to DELETE
    // or delete from local array to keep the array size as smaller
    if (deleteResource.taskId) {
      deleteResource.mode = 'DELETE';
      form.markAsDirty(true);
      console.log('userstory', 'delete owner inside if');
    } else {
      // console.log('userstory', 'delete owner inside else');
      this.selectedSchedule.resources = this.selectedSchedule.resources.filter(filter => filter.userId !== deleteResource.userId);
    }

    console.log('userstory', 'resource after deletion', this.selectedUserstory);
  }

  resetOwners() {
    this.selectedSchedule.resources = [];
    this.selectedUserstory.userstoryId = null;
  }

  createSchedule() {

    if (!this.selectedUserstory.schedules) {
      this.selectedUserstory.schedules = [];
    }

    this.selectedUserstory.schedules.push(new Schedule());

    let lastRecord = this.selectedUserstory.schedules.length - 1;
    console.log(lastRecord);
    this.selectedSchedule = this.selectedUserstory.schedules[lastRecord];
    this.changeAvailPhaseDynamically();
  }


}
