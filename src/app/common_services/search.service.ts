import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GlobalConfig } from '../global-config';
import { SearchCriteria } from '../search/search-criteria';


@Injectable()
export class SearchService {

  searchApiURL = GlobalConfig.getSearchApiURL();

  constructor(private http: Http) { }

  getSearchCriterias(searchCriReq: SearchCriteria): Observable<SearchCriteria> {

    return this.http.post(`${this.searchApiURL}`, searchCriReq, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

}
