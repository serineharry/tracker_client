import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SearchCriteria } from '../search/search-criteria';
import { Task } from '../model/task';


@Injectable()
export class DashboardService {

  dashboardApiURL = GlobalConfig.getDashboardApiURL();

  constructor(private http: Http) { }

  getUserTask(task: Task): Observable<Task[]> {

    return this.http.post(`${this.dashboardApiURL}/user`, task, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));
  }

  getUserMissedTask(task: Task): Observable<Task[]> {

    return this.http.post(`${this.dashboardApiURL}/user/missed`, task, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));
  }

  getApplicationTask(applicationId: number): Observable<Task[]> {
    return this.http.get(`${this.dashboardApiURL}/application/${applicationId}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));
  }

  getApplicationMissedTask(applicationId: number): Observable<Task[]> {
    return this.http.get(`${this.dashboardApiURL}/application/missed/${applicationId}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));
  }
}
