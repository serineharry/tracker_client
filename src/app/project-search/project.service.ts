import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SearchCriteria } from '../search/search-criteria';
import { Project } from '../model/project';


@Injectable()
export class ProjectService {

  projectApiURL = GlobalConfig.getProjectApiURL();

  constructor(private http: Http) { }

  searchProjects(searchCriteriaList: SearchCriteria[]): Observable<Project[]> {

    return this.http.post(`${this.projectApiURL}/search`, searchCriteriaList, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

  getProject(id: number): Observable<Project> {

    return this.http.get(`${this.projectApiURL}/${id}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

  addProject(proj: Project): Observable<Project> {

    return this.http.post(`${this.projectApiURL}`, proj, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.text().length > 0 ? res.json() : {} : {})
      .catch((error: any) => Observable.throw(error));

  }

  updateProject(proj: Project): Observable<Project> {

    return this.http.put(`${this.projectApiURL}`, proj, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.text().length > 0 ? res.json() : {} : {})
      .catch((error: any) => Observable.throw(error));

  }

}
