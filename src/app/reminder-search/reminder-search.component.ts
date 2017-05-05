import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reminder } from '../model/reminder';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';

import { SearchService } from '../common_services/search.service';
import { SearchCriteria } from '../search/search-criteria';
import { FormGroup } from '@angular/forms';
import { ReminderService } from './reminder.service';
import { GlobalConfig } from '../global-config';


@Component({
  selector: 'app-reminder-search',
  templateUrl: './reminder-search.component.html',
  styleUrls: ['./reminder-search.component.css'],
  providers: [SearchService, ReminderService]
})

export class ReminderSearchComponent implements OnInit {

  @Input()
  useAs: string;

  @Output()
  searchSelect: EventEmitter<Reminder> = new EventEmitter();

  reminders: Reminder[] = [];
  userDateFormat = '';
  searchInProgress = false;
  companyAdmin = false;
  errorMessage;

  constructor(private globalSvc: GlobalService, private searchSvc: SearchService,
    private reminderSvc: ReminderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.userDateFormat = this.globalSvc.getDateFormat();
    this.companyAdmin = this.globalSvc.getApplicationAdminPermission();

  }

  performSearch(event: any) {

    let _searchCriteriaList: SearchCriteria[] = event.searchCriteriaList;
    let _searchForm: FormGroup = event.searchForm;

    if (!_searchForm.valid) {
      return;
    }

    if (_searchCriteriaList.length === 0) {
      _searchCriteriaList = [];
    }

    let _searchCriteria = new SearchCriteria('Application Id', 'number', '=',
      this.globalSvc.getApplication().applicationId.toString(), '', true);

    _searchCriteriaList.push(_searchCriteria);

    console.log('_searchCriteriaList', _searchCriteriaList);

    this.searchInProgress = true;

    this.reminderSvc.searchReminders(_searchCriteriaList)
      .subscribe(
      reminders => {
        this.searchInProgress = false;
        this.reminders = reminders;

      },
      err => {
        this.searchInProgress = false;
        console.log('criteria search error', err);
        this.errorMessage = 'Search error ' + GlobalConfig.parseException(err);
      }
      );

  }

  openReminder(reminder: Reminder) {

    if (this.useAs === 'drilldown') {
      this.searchSelect.emit(reminder);
    } else {
      this.router.navigate(['../reminder', reminder.reminderId], { relativeTo: this.route });
    }

  }

  createReminder() {
    this.router.navigate(['../reminder', 0], { relativeTo: this.route });
  }

}
