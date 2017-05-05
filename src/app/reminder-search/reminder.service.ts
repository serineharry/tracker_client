import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SearchCriteria } from '../search/search-criteria';
import { Reminder } from '../model/reminder';


@Injectable()
export class ReminderService {

  reminderApiURL = GlobalConfig.getReminderApiURL();

  constructor(private http: Http) { }

  searchReminders(searchCriteriaList: SearchCriteria[]): Observable<Reminder[]> {

    return this.http.post(`${this.reminderApiURL}/search`, searchCriteriaList, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

  getReminder(id: number): Observable<Reminder> {

    return this.http.get(`${this.reminderApiURL}/${id}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

  addReminder(reminder: Reminder): Observable<Reminder> {

    return this.http.post(`${this.reminderApiURL}`, reminder, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.text().length > 0 ? res.json() : {} : {})
      .catch((error: any) => Observable.throw(error));

  }

  updateReminder(reminder: Reminder): Observable<Reminder> {

    return this.http.put(`${this.reminderApiURL}`, reminder, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.text().length > 0 ? res.json() : {} : {})
      .catch((error: any) => Observable.throw(error));

  }

  deleteReminder(reminderId: number): Observable<Reminder> {

    return this.http.delete(`${this.reminderApiURL}/${reminderId}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.text().length > 0 ? res.json() : {} : {})
      .catch((error: any) => Observable.throw(error));
  }

}
