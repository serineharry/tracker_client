import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SearchCriteria } from '../search/search-criteria';
import { User } from '../model/user';



@Injectable()
export class UserService {

  userApiURL = GlobalConfig.getUserApiURL();

  constructor(private http: Http) { }

  searchUsers(searchCriteriaList: SearchCriteria[]): Observable<User[]> {

    return this.http.post(`${this.userApiURL}/search`, searchCriteriaList, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error.text().error || 'server error'));

  }

  getUser(id: number): Observable<User> {

    return this.http.get(`${this.userApiURL}/${id}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error.text().error || 'server error'));

  }

  getUserByName(username: string): Observable<User> {

    return this.http.get(`${this.userApiURL}/name/${username}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));
  }

  addUser(proj: User): Observable<User> {

    return this.http.post(`${this.userApiURL}`, proj, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

  updateUser(proj: User): Observable<User> {

    return this.http.put(`${this.userApiURL}`, proj, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

}
