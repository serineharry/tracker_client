import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../model/project';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';

import { SearchService } from '../common_services/search.service';
import { SearchCriteria } from '../search/search-criteria';
import { FormGroup } from '@angular/forms';
import { ProjectService } from './project.service';
import { GlobalConfig } from '../global-config';


@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.css'],
  providers: [SearchService, ProjectService]
})

export class ProjectSearchComponent implements OnInit {

  @Input()
  useAs: string;

  @Output()
  searchSelect: EventEmitter<Project> = new EventEmitter();

  projects: Project[] = [];
  userDateFormat = '';
  searchInProgress = false;
  companyAdmin = false;
  errorMessage;


  constructor(private globalSvc: GlobalService, private searchSvc: SearchService,
    private projSvc: ProjectService, private router: Router, private route: ActivatedRoute) { }

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

    this.projSvc.searchProjects(_searchCriteriaList)
      .subscribe(
      projects => {
        this.searchInProgress = false;
        this.projects = projects;

      },
      err => {
        this.searchInProgress = false;
        console.log('criteria fetch error', err);
        this.errorMessage = 'Search error ' + GlobalConfig.parseException(err);
      }
      );

  }

  openProject(project: Project) {

    if (this.useAs === 'drilldown') {
      this.searchSelect.emit(project);
    } else {
      this.router.navigate(['../project', project.projectId], { relativeTo: this.route });
    }

  }

  createProject() {
    this.router.navigate(['../project', 0], { relativeTo: this.route });
  }

}
