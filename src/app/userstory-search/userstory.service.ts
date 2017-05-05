import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Userstory } from '../model/userstory';
import { SearchCriteria } from '../search/search-criteria';



@Injectable()
export class UserstoryService {

  userstoryApiURL = GlobalConfig.getUserstoryApiURL();


  constructor(private http: Http) { }

  searchUserstorys(searchRequest: SearchCriteria[]): Observable<Userstory[]> {

    return this.http.post(`${this.userstoryApiURL}/search`, searchRequest, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.text().error || 'server error'));

  }

  getProjectUserstories(id: number): Observable<Userstory[]> {

    return this.http.get(`${this.userstoryApiURL}/project/${id}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.text().error || 'server error'));

  }

  addUserstory(sched: Userstory): Observable<Userstory> {

    return this.http.post(`${this.userstoryApiURL}`, sched, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

  updateUserstory(sched: Userstory): Observable<Userstory> {

    return this.http.put(`${this.userstoryApiURL}`, sched, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }


  deleteUserstory(userstoryId: number): Observable<string> {

    return this.http.delete(`${this.userstoryApiURL}/${userstoryId}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.text() : {})
      .catch((error: any) => Observable.throw(error));
  }
  // addApplication(Userstory)
  // updateUserstory(Userstory)
  // deleteUserstory(int)




}
