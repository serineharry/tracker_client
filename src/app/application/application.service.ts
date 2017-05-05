import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GlobalConfig } from '../global-config';
import { Application } from '../model/application';
import { User } from '../model/user';
import { Role } from '../model/role';
import { RequestPk } from '../model/request-pk';


@Injectable()
export class ApplicationService {

  appApiURL = GlobalConfig.getApplicationApiURL();


  constructor(private http: Http) { }

  getApplications(id: number): Observable<Application[]> {

    return this.http.get(`${this.appApiURL}/${id}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }


  getApplicationByAcronymn(appAcronymn: string): Observable<Application> {

    return this.http.get(`${this.appApiURL}/acronymn/${appAcronymn}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }


  createApplication(app: Application): Observable<Application> {

    return this.http.post(`${this.appApiURL}`, app, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

  updateApplication(app: Application): Observable<Application> {

    return this.http.put(`${this.appApiURL}`, app, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

  getAssignedUsers(appId: number): Observable<User[]> {

    return this.http.get(`${this.appApiURL}/appuser/${appId}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));
  }

  getUsers(attUid: string): Observable<User[]> {

    return this.http.get(`${this.appApiURL}/user/${attUid}`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }

  getAllRoles(): Observable<Role[]> {

    return this.http.get(`${this.appApiURL}/roles`, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }


  assignApplicationUsers(app: Application): Observable<string> {

    return this.http.post(`${this.appApiURL}/appusers`, app, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.text() : {})
      .catch((error: any) => Observable.throw(error));

  }

  assignApplicationUserRole(appReq: Application): Observable<string> {

    return this.http.post(`${this.appApiURL}/appuserrole`, appReq, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.text() : {})
      .catch((error: any) => Observable.throw(error));

  }


  unAssignApplicationUserRole(appReq: Application): Observable<string> {

    let reqOpt = GlobalConfig.getRequestOptions();
    reqOpt.body = appReq;
    return this.http.delete(`${this.appApiURL}/appuserrole`, reqOpt)
      .map((res: Response) => res.text().length > 0 ? res.text() : {})
      .catch((error: any) => Observable.throw(error));
  }

  unAssignApplicationUsers(appReq: Application): Observable<string> {

    let reqOpt = GlobalConfig.getRequestOptions();
    reqOpt.body = appReq;
    return this.http.delete(`${this.appApiURL}/appusers`, reqOpt)
      .map((res: Response) => res.text().length > 0 ? res.text() : {})
      .catch((error: any) => Observable.throw(error));
  }

  getRolesForSelectedApplicationAndUser(req: RequestPk): Observable<Role[]> {

    return this.http.post(`${this.appApiURL}/rolesforappuser`, req, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.text().length > 0 ? res.json() : {})
      .catch((error: any) => Observable.throw(error));

  }


}
