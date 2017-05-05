import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchConfig } from './search-config';
import { SearchService } from './search.service';
import { SearchCriteria } from './search-criteria';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  @Input()
  searchFor: string;

  @Input()
  inProgress = false;

  @Output()
  search: EventEmitter<any> = new EventEmitter();


  searchConfigList: SearchConfig[];
  searchCriteriaList: SearchCriteria[] = [];
  stringFilter = ['=', 'like', 'in'];
  numberFilter = ['=', '>', '<', '<=', '>='];
  dateFilter = ['=', '>', '<', '<=', '>='];

  constructor(private searchSvc: SearchService) { }

  ngOnInit() {

    let defaultCriteria = new SearchCriteria();
    defaultCriteria.fieldName = '';
    defaultCriteria.fieldValue = '';
    defaultCriteria.logicalCdn = '';
    this.searchCriteriaList.push(defaultCriteria);

    this.getConfig();

  }

  getConfig() {

    this.searchSvc.getSearchConfig(this.searchFor)
      .subscribe(
      searchConfig => {
        this.searchConfigList = searchConfig;
        console.log('searchConfigList', this.searchConfigList);
      },
      err => {
        console.log('Fetch Exception', err);
      }
      );

  }

  changeFilterDynamically(selectedCriteria: SearchCriteria) {
    let searchConfigArr = this.searchConfigList.filter(filter => filter.fieldName === selectedCriteria.fieldName);
    console.log('searchConfigArr', searchConfigArr);
    if (searchConfigArr && searchConfigArr.length > 0) {
      let searchConfig = searchConfigArr[0];
      selectedCriteria.fieldType = searchConfig.fieldType;
      selectedCriteria.fieldFilter = '=';
    }
  }

  addRowIfLast(rowNum: number, value: string) {

    if (rowNum === (this.searchCriteriaList.length - 1)) {
      this.searchCriteriaList.push(new SearchCriteria());
    }
    console.log(value);
  }

  deleteCriteria(rowNum: number) {

    if (rowNum === (this.searchCriteriaList.length - 1)) {
      let searchCriteriaList = this.searchCriteriaList[rowNum - 1];
      searchCriteriaList.logicalCdn = '';
    }
    this.searchCriteriaList.splice(rowNum, 1);
  }

  performSearch(event: Event, searchCriteriaList: SearchCriteria[], searchForm: FormGroup) {
    event.stopPropagation();

    let cloneSearchList = Object.assign([], searchCriteriaList);

    this.search.emit({
      'event': event, 'searchCriteriaList': cloneSearchList, 'searchForm': searchForm
    });

  }

  resetForm(event: Event) {
    this.searchCriteriaList = [];

    let searchCriteria = new SearchCriteria();
    searchCriteria.logicalCdn = '';
    this.searchCriteriaList.push(searchCriteria);
  }

  performSearchOnEnter(event: KeyboardEvent, searchCriteriaList: SearchCriteria[], searchForm: FormGroup) {

    if (event.keyCode === 13) {
      this.performSearch(event, searchCriteriaList, searchForm);
    }

  }

}
