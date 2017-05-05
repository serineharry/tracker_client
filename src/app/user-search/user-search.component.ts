import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../model/user';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './user.service';
import { SearchService } from '../common_services/search.service';
import { SearchCriteria } from '../search/search-criteria';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
  providers: [SearchService, UserService]
})

export class UserSearchComponent implements OnInit {


  @Input()
  useAs: string;

  @Output()
  searchSelect: EventEmitter<User> = new EventEmitter();

  users: User[] = [];
  userDateFormat = '';
  searchInProgress = false;

  companyAdmin = false;
  loggedinUser: User;


  constructor(private globalSvc: GlobalService, private searchSvc: SearchService,
    private userSvc: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.userDateFormat = this.globalSvc.getDateFormat();
    this.companyAdmin = this.globalSvc.getApplicationAdminPermission();
    this.loggedinUser = this.globalSvc.getUser();

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

    // let _searchCriteria = new SearchCriteria('Application Id', 'number', '=',
    //   this.globalSvc.getApplication().applicationId.toString(), '', true);
    // _searchCriteriaList.push(_searchCriteria);

    console.log('_searchCriteriaList', _searchCriteriaList);

    this.searchInProgress = true;

    this.userSvc.searchUsers(_searchCriteriaList)
      .subscribe(
      users => {
        this.searchInProgress = false;
        this.users = users;

      },
      err => {
        this.searchInProgress = false;
        console.log('criteria fetch error', err);
      }
      );

  }

  openUser(event: Event, user: User) {

    if (this.useAs === 'drilldown') {
      event.stopPropagation();
      this.searchSelect.emit(user);
    } else {
      this.router.navigate(['../user', user.userId], { relativeTo: this.route });
    }

  }

  createUser() {
    this.router.navigate(['../user', 0], { relativeTo: this.route });
  }

}
