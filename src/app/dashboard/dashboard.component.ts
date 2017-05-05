import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GlobalConfig } from '../global-config';
import { User } from '../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedApplication;
  nonAdminSingleAppUser = false;
  companyAdmin: boolean;
  user: User;

  constructor(private globalSvc: GlobalService, private router: Router, private route: ActivatedRoute, private location: Location) {
    console.log('dashboard init', this.router.url);
    this.selectedApplication = this.globalSvc.getApplication().applicationAcronym;
    this.user = this.globalSvc.getUser();
    this.companyAdmin = this.globalSvc.getApplicationAdminPermission();

    this.nonAdminSingleAppUser = this.globalSvc.getNonAdminSingleAppUser();

    if (this.router.url.endsWith('dashboard')) {
      this.redirectToProperDashboard();
    }
  }

  ngOnInit() {
  }

  redirectToProperDashboard() {

    if (this.companyAdmin || this.user.globalAdmin) {
      console.log('redirecting to dashboard app');
      this.router.navigate(['dashboard-app'], { relativeTo: this.route, skipLocationChange: true });
    } else {
      console.log('redirecting to dashboard user');
      this.router.navigate(['dashboard-user'], { relativeTo: this.route, skipLocationChange: true });
    }

  }

  loadDefaultDashboard() {
    this.location.go('/dashboard');
    this.redirectToProperDashboard();
  }

}
