import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReminderService } from '../reminder-search/reminder.service';
import { Reminder } from '../model/reminder';
import { Location } from '@angular/common';
import { Resource } from '../model/resource';
import { User } from '../model/user';
import { GlobalConfig } from '../global-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reminder-details',
  templateUrl: './reminder-details.component.html',
  styleUrls: ['./reminder-details.component.css'],
  providers: [ReminderService]
})
export class ReminderDetailsComponent implements OnInit {

  weekdayss;

  errorMessage;
  reminder = new Reminder();
  createOrUpdate = 'Create';
  companyAdmin;
  month_days;
  toggleSection = 'reminder';
  reminderUpdateInProgress = false;


  constructor(private globalSvc: GlobalService, private router: Router, private route: ActivatedRoute,
    private remSvc: ReminderService, private location: Location) { }

  ngOnInit() {
    this.reminder.reminderId = this.route.snapshot.params['id'];
    this.companyAdmin = this.globalSvc.getApplicationAdminPermission();
    this.month_days = Array(31).fill(1, 0, 31).map((e, i) => i + 1);

    if (this.reminder.reminderId > 0) {
      this.createOrUpdate = 'Update';

      this.remSvc.getReminder(this.reminder.reminderId)
        .subscribe(
        reminderResp => {
          this.reminder = reminderResp;
        },
        err => {
          console.log('Project Fetch Exception', err);
          this.errorMessage = 'Update error ' + GlobalConfig.parseException(err);

        }
        );


    }

  }
  assignUser(user: User, form: FormGroup) {

    this.toggleSection = 'reminder';

    // since this is the list and form not observing this as model, make it dirty explicitly
    form.markAsDirty(true);

    if (!this.reminder.users) {
      this.reminder.users = [];
    }

    let index = this.reminder.users.findIndex(filter => filter.userId === user.userId);
    if (index < 0) {
      this.reminder.users.push(user);
    } else {
      this.reminder.users[index] = user;
    }

  }

  removeUser(user: User) {
    this.reminder.users = this.reminder.users.filter(filter => filter.userId !== user.userId);
  }

  updateReminder(formValid: boolean, formDirty: boolean) {

    console.log('formValid', formValid, 'formDirty', formDirty);

    console.log(JSON.stringify(this.reminder));

    if (!formDirty) {
      return;
    }

    if (!formValid) {
      this.errorMessage = 'Mandatory Fields are missing';
      return;
    }

    this.reminderUpdateInProgress = true;
    this.reminder.applicationId = this.globalSvc.getApplication().applicationId;

    if (this.reminder.reminderId > 0) {
      this.remSvc.updateReminder(this.reminder)
        .subscribe(
        reminderResp => {
          this.reminder = reminderResp;
          if (this.reminder.reminderId > 0) {
            this.createOrUpdate = 'Update';
          }
          console.log('reminder-details', this.reminder);
          this.reminderUpdateInProgress = false;

        },
        err => {
          console.log('Update Exception', err);
          this.reminderUpdateInProgress = false;
          this.errorMessage = 'Update error ' + GlobalConfig.parseException(err);
        }
        );
    } else {
      this.remSvc.addReminder(this.reminder)
        .subscribe(
        reminderResp => {
          this.reminder = reminderResp;
          if (this.reminder.reminderId > 0) {
            this.createOrUpdate = 'Update';
          }
          console.log(this.reminder);
          this.reminderUpdateInProgress = false;
        },
        err => {
          console.log('Create Exception', err);
          this.reminderUpdateInProgress = false;
          this.errorMessage = 'Create error ' + GlobalConfig.parseException(err);
        }
        );
    }
  }

  deleteReminder() {

    this.remSvc.deleteReminder(this.reminder.reminderId)
      .subscribe(
      reminderesp => {
        this.reminderUpdateInProgress = false;
        this.router.navigate(['./dashboard/reminder']);
      },
      err => {
        console.log('Delete Exception', err);
        this.reminderUpdateInProgress = false;
        this.errorMessage = 'Delete error ' + GlobalConfig.parseException(err);
      }
      );

  }

  goBack() {
    this.location.back();
  }
}
