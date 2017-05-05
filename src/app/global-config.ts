import { RequestOptions, Headers, Response } from '@angular/http';
import { TokenState } from './model/token-state';
import { http_error_codes } from './model/http-error-codes';
import { RestErrorResponse } from './model/rest-error-response';

export class GlobalConfig {

    private static serverURL = 'http://localhost:8080/tracker';


    public static getServerURL(): string {
        return this.serverURL;
    }

    private static getRestURL(): string {
        return this.serverURL + '/rest';
    }

    public static getLoginApiURL(): string {
        return this.getServerURL() + '/authenticate';
    }

    public static getSecurePingApiURL(): string {
        return this.getRestURL() + '/secureping';
    }

    public static getApplicationApiURL(): string {
        return this.getRestURL() + '/application';
    }

    public static getSearchApiURL(): string {
        return this.getRestURL() + '/search';
    }

    public static getProjectApiURL(): string {
        return this.getRestURL() + '/project';
    }


    public static getUserstoryApiURL(): string {
        return this.getRestURL() + '/userstory';
    }

    public static getScheduleApiURL(): string {
        return this.getRestURL() + '/schedule';
    }

    public static getResourceApiURL(): string {
        return this.getRestURL() + '/resource';
    }

    public static getTaskApiURL(): string {
        return this.getRestURL() + '/task';
    }

    public static getDashboardApiURL(): string {
        return this.getRestURL() + '/dashboard';
    }

    public static getUserApiURL(): string {
        return this.getRestURL() + '/user';
    }

    public static getReminderApiURL(): string {
        return this.getRestURL() + '/reminder';
    }



    public static getRequestOptions(): RequestOptions {

        let header = new Headers({
            'Content-Type': 'application/json'
        }); // ... Set content type to JSON

        let token: TokenState = JSON.parse(localStorage.getItem('token'));

        if (token && token.accessToken) {
            // console.log('Bearer ' + token.accessToken);
            header.append('X-AUTH-TOKEN', 'Bearer ' + token.accessToken);
        }

        return new RequestOptions({ headers: header }); // Create a request option

    }



    public static parseException(error: any): string {

        console.log('inside parsinglocaiton', error);

        let errorResp;

        try {
            errorResp = ' ' + error.json().code + ' ' + error.json().message;
        } catch (err) {
            if (error instanceof Response) {
                if (http_error_codes[error.status]) {
                    errorResp = ' ' + error.status + ' ' + http_error_codes[error.status];
                } else {
                    errorResp = ' ' + error.status + ' ' + 'Unknown !!!!';
                }
            } else {
                errorResp = 'Unable to reach server !!!';
            }
        }
        return errorResp;

    }

}
