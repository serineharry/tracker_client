import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TokenState } from '../model/token-state';

@Injectable()
export class AuthenticationService {

  loginAPIURL = GlobalConfig.getLoginApiURL();
  pingAPIURL = GlobalConfig.getSecurePingApiURL();

  isAuthenticated = false;

  constructor(private http: Http) { }

  authenticate(username: string, password: string): Observable<TokenState> {

    console.log('inside authenticate');

    let header = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }); // ... Set content type to JSON

    let body = 'username=' + username + '&password=' + password;

    let options = new RequestOptions({ headers: header }); // Create a request option
    // options.withCredentials = true;

    return this.http.post(this.loginAPIURL, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));

  }

  pingServer(): Promise<Response> {
    return this.http.get(this.pingAPIURL, GlobalConfig.getRequestOptions())
      .toPromise();
  }

}
