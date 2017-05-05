import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenState } from '../model/token-state';
import { AuthenticationService } from '../common_services/authentication.service';
import { GlobalService } from '../global.service';
import { GlobalConfig } from '../global-config';
import { MessageboxService } from '../messagebox/messagebox.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {

  username: string;
  password: string;
  token: TokenState;
  errorMessage: string;
  calledFrom: string;
  style: string;
  loginInProgress = false;


  constructor(private authService: AuthenticationService, private router: Router,
    private actRoute: ActivatedRoute, private globalSvc: GlobalService, private ref: ChangeDetectorRef,
    private messageService: MessageboxService) {
    this.calledFrom = this.actRoute.snapshot.queryParams['returnURL'];
  }

  ngOnInit() {
    this.username = 'sm326m';
    this.password = 'sree123';

  }



  login(isValid: boolean) {

    console.log(isValid);

    if (!isValid) {
      return;
    }
    this.token = null;

    this.loginInProgress = true;

    this.authService.authenticate(this.username, this.password)
      .subscribe(
      response => {
        this.processSuccess(response);
        this.loginInProgress = false;
      },
      err => {
        this.displayError('Login error ' + GlobalConfig.parseException(err));
        this.loginInProgress = false;
      }
      );
  }

  processSuccess(res: TokenState) {

    this.token = res;
    console.log(this.token);

    this.globalSvc.setUser(res.user);

    delete res['user'];
    console.log('login', 'user', this.globalSvc.getUser());
    localStorage.setItem('token', JSON.stringify(res));

    console.log('CalledFrom:' + this.calledFrom);

    // this.router.navigate([this.calledFrom]);
    this.router.navigate(['/application'], {
      queryParams: { returnURL: this.calledFrom }
    });

    // this.location.back();

  }

  displayError(errMsg: string) {
    this.errorMessage = errMsg;
    setTimeout(function () {
      this.errorMessage = null;
    }.bind(this), 3000);
  }

}
