import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Schedule } from '../model/schedule';
import { SearchCriteria } from '../search/search-criteria';



@Injectable()
export class ScheduleService {

  scheduleApiURL = GlobalConfig.getScheduleApiURL();


  constructor(private http: Http) { }

  searchSchedules(searchRequest: SearchCriteria[]): Observable<Schedule[]> {

    return this.http.post(`${this.scheduleApiURL}/search`, searchRequest, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.text().error || 'server error'));

  }

  getProjectSchedules(id: number): Observable<Schedule[]> {

    return this.http.get(`${this.scheduleApiURL}/project/${id}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.text().error || 'server error'));

  }

  addSchedule(sched: Schedule): Observable<Schedule> {

    return this.http.post(`${this.scheduleApiURL}`, sched, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

  updateSchedule(sched: Schedule): Observable<Schedule> {

    return this.http.put(`${this.scheduleApiURL}`, sched, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }


  deleteSchedule(scheduleId: number): Observable<string> {

    return this.http.delete(`${this.scheduleApiURL}/${scheduleId}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.text() : {})
      .catch((error: any) => Observable.throw(error));
  }
  // addApplication(Schedule)
  // updateSchedule(Schedule)
  // deleteSchedule(int)




}
