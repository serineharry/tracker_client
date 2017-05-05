import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Schedule } from '../model/schedule';
import { Resource } from '../model/resource';


@Injectable()
export class ResourceService {

  resourceApiURL = GlobalConfig.getResourceApiURL();

  constructor(private http: Http) { }

  getResourcesWithAvailablity(schedule: Schedule): Observable<Resource[]> {

    return this.http.post(`${this.resourceApiURL}`, schedule, GlobalConfig.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.text().error || 'server error'));

  }

}
