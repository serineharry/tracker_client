import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { GlobalService } from '../global.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private globalSvc: GlobalService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.globalSvc.getUser().userId > 0) {
      return this.authService.pingServer()
        .then((resp: Response) => { return true; },
        (err: any) => {
          this.navigateToLoginPage(state);
          return false;
        });
    } else {
      this.navigateToLoginPage(state);
      return false;
    }


  }

  navigateToLoginPage(state: RouterStateSnapshot) {

    console.log('auth-guard', state.url);

    if (state.url && state.url === '/tracker/login') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnURL: state.url }
      });
    }



  }

}
