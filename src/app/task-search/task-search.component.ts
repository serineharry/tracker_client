import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from './task.service';
import { GlobalService } from '../global.service';
import { SearchService } from '../common_services/search.service';
import { Task } from '../model/task';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchCriteria } from '../search/search-criteria';
import { FormGroup } from '@angular/forms';
import { GlobalConfig } from '../global-config';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css'],
  providers: [TaskService, SearchService]
})
export class TaskSearchComponent implements OnInit {

  @Input()
  useAs: string;

  @Output()
  searchSelect: EventEmitter<Task> = new EventEmitter();

  tasks: Task[] = [];
  userDateFormat = '';
  searchInProgress = false;
  companyAdmin;
  errorMessage;


  constructor(private globalSvc: GlobalService, private taskSvc: TaskService,
    private searchSvc: SearchService, private router: Router, private route: ActivatedRoute) { }

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

    console.log('task-search', 'appid', this.globalSvc.getApplication().applicationId);

    let _searchCriteria = new SearchCriteria('Application Id', 'number', '=',
      this.globalSvc.getApplication().applicationId.toString(), '', true);

    _searchCriteriaList.push(_searchCriteria);

    console.log('_searchCriteriaList', _searchCriteriaList);

    this.searchInProgress = true;

    this.taskSvc.searchTasks(_searchCriteriaList)
      .subscribe(
      respTasks => {
        this.searchInProgress = false;
        this.tasks = respTasks;

      },
      err => {
        this.searchInProgress = false;
        console.log('criteria fetch error', err);
        this.errorMessage = 'Search error ' + GlobalConfig.parseException(err);
      }
      );

  }

  openTask(task: Task) {
    if (this.useAs === 'drilldown') {
      this.searchSelect.emit(task);
    } else {
      this.router.navigate(['../task', task.taskId], { relativeTo: this.route });
    }

  }

  createTask() {
    this.router.navigate(['../task', 0], { relativeTo: this.route });
  }


}
