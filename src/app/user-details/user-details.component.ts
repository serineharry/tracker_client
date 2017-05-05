import { Component, OnInit, animate } from '@angular/core';
import { User } from '../model/user';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user-search/user.service';
import { GlobalConfig } from '../global-config';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [UserService]
})
export class UserDetailsComponent implements OnInit {

  createOrUpdate = 'Create';
  userUpdateInProgress = false;
  passwordMatches = false;
  user = new User();
  errorMessage;
  newpass = '';
  confirmpass = '';
  companyAdmin = false;

  constructor(private router: Router, private route: ActivatedRoute, private userSvc: UserService,
    private globalSvc: GlobalService, private location: Location) { }

  ngOnInit() {

    // this.user.userId = this.route.snapshot.params['id'];

    this.companyAdmin = this.globalSvc.getApplicationAdminPermission();

    this.route.params.subscribe(res => {
      this.user.userId = res['id'];
      this.loadUserData();
    });
  }

  loadUserData() {
    if (this.user.userId && this.user.userId > 0) {

      this.createOrUpdate = 'Update';

      this.userSvc.getUser(this.user.userId)
        .subscribe(
        userResp => {
          this.user = userResp;
          console.log('user-details', this.user);
        },
        err => {
          console.log('user fetch error', err);
          this.errorMessage = 'user fetch error ' + GlobalConfig.parseException(err);
        }
        );
    }
  }

  validateUser(ctrlDirty: boolean) {

    if (!ctrlDirty) {
      return;
    }

    if (!this.user.username || this.user.username.length <= 0) {
      return;
    }

    this.userSvc.getUserByName(this.user.username)
      .subscribe(
      userResp => {
        if (userResp && userResp.userId > 0) {
          this.errorMessage = 'User Already Exist';
          this.user.username = '';
        }
        console.log('user-details', this.user);
      },
      err => {
        console.log('user fetch error', err);
        this.errorMessage = 'user fetch error ' + GlobalConfig.parseException(err);
        this.user.username = '';
      }
      );

  }



  validatePasswordMatch() {

    if (this.newpass === this.confirmpass) {
      this.passwordMatches = true;
    } else {
      this.passwordMatches = false;
    }

  }

  updateUser(formValid: boolean, formDirty: boolean) {

    console.log(formValid, formDirty);

    if (!formDirty) {
      return;
    }

    if (!formValid) {
      this.errorMessage = 'User form not valid for submission';
      return;
    }

    // form validating but Angular not making invalid. it consider as valid for any incorrect formats also.
    if (this.user.emailAddress) {
      let email = this.user.emailAddress;
      if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
        return;
      }
    }

    if (this.passwordMatches) {
      this.user.newpassword = this.newpass;
    }

    this.userUpdateInProgress = true;

    if (this.user.userId > 0) {
      this.userSvc.updateUser(this.user)
        .subscribe(
        userResp => {
          this.user = userResp;
          console.log(userResp);
          this.userUpdateInProgress = false;
          this.newpass = null;
          this.confirmpass = null;

        },
        err => {
          console.log('Update Exception', err);
          this.userUpdateInProgress = false;
          this.errorMessage = 'Update error ' + GlobalConfig.parseException(err);
        }
        );

    } else {
      this.userSvc.addUser(this.user)
        .subscribe(
        userResp => {
          this.user = userResp;
          this.createOrUpdate = 'Update';
          console.log(userResp);
          this.userUpdateInProgress = false;
          this.newpass = null;
          this.confirmpass = null;

        },
        err => {
          console.log('add Exception', err);
          this.userUpdateInProgress = false;
          this.errorMessage = 'Add error ' + GlobalConfig.parseException(err);
        }
        );

    }
  }

  goBack() {
    this.location.back();
  }


}
