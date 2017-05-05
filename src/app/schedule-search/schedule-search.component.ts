import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../global.service';
import { ScheduleService } from './schedule.service';
import { SearchService } from '../search/search.service';
import { Router } from '@angular/router';
import { Schedule } from '../model/schedule';
import { SearchCriteria } from '../search/search-criteria';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-schedule-search',
  templateUrl: './schedule-search.component.html',
  styleUrls: ['./schedule-search.component.css'],
  providers: [SearchService, ScheduleService]
})
export class ScheduleSearchComponent implements OnInit {


  @Output()
  scheduleSelect: EventEmitter<Schedule> = new EventEmitter<Schedule>();


  schedules: Schedule[] = [];
  userDateFormat = '';
  searchInProgress = false;
  constructor(private globalSvc: GlobalService, private searchSvc: SearchService,
    private schedSvc: ScheduleService, private router: Router) { }

  ngOnInit() {
    this.userDateFormat = this.globalSvc.getDateFormat();

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

    this.schedSvc.searchSchedules(_searchCriteriaList)
      .subscribe(
      respSchedule => {
        this.searchInProgress = false;
        this.schedules = respSchedule;

      },
      err => {
        this.searchInProgress = false;
        console.log('criteria fetch error', err);
      }
      );

  }

  emitSelect(event: Event, selectedSchedule: Schedule) {
    this.scheduleSelect.emit(selectedSchedule);
  }


}
