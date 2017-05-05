import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SearchCriteria } from '../search/search-criteria';
import { Task } from '../model/task';


@Injectable()
export class TaskService {

  taskApiURL = GlobalConfig.getTaskApiURL();

  constructor(private http: Http) { }

  searchTasks(searchCriteriaList: SearchCriteria[]): Observable<Task[]> {

    return this.http.post(`${this.taskApiURL}/search`, searchCriteriaList, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

  getTask(id: number): Observable<Task> {

    return this.http.get(`${this.taskApiURL}/${id}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

  addTask(task: Task): Observable<Task> {

    return this.http.post(`${this.taskApiURL}`, task, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.text().length > 0 ? res.json() : {} : {})
      .catch((error: any) => Observable.throw(error));

  }

  updateTask(task: Task): Observable<Task> {

    return this.http.put(`${this.taskApiURL}`, task, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.text().length > 0 ? res.json() : {} : {})
      .catch((error: any) => Observable.throw(error));

  }

}
