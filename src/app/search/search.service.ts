import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SearchConfig } from './search-config';


@Injectable()
export class SearchService {

  searchApiURL = GlobalConfig.getSearchApiURL();

  constructor(private http: Http) { }

  getSearchConfig(searchOn: string): Observable<SearchConfig[]> {

    return this.http.get(`${this.searchApiURL}/config/${searchOn}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.text().error || 'server error'));
  }


}
