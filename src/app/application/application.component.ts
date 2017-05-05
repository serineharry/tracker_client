import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Role } from '../model/role';
import { MessageModel } from '../messagebox/message-model';
import { ApplicationService } from './application.service';
import { Application } from '../model/application';
import { GlobalConfig } from '../global-config';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestPk } from '../model/request-pk';
import { Location } from '@angular/common';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.css'],
    providers: [ApplicationService]
})
export class ApplicationComponent implements OnInit {

    calledFrom: string;
    apps: Application[] = [];
    app: Application = new Application();
    companyOperation = 'Create';
    userOperation = 'Update';

    companyInProgress = false;
    searchInProgress = false;
    assignInProgress = false;
    companySubmissionErrorMessage: string;
    userAssignMessage: string;

    users: User[] = [];
    userSearchText = '';
    roles: Role[] = [];

    selectedUserCnt = 0;

    messageModel: MessageModel = new MessageModel();

    globalAdmin = this.globalService.getUser().globalAdmin;
    // inc = 0;


    constructor(private globalService: GlobalService, private appService: ApplicationService,
        private actRoute: ActivatedRoute, private router: Router, private location: Location) {

        let retUrl: string = this.actRoute.snapshot.queryParams['returnURL'];

        if (retUrl && !retUrl.endsWith('application')) {
            this.calledFrom = retUrl;
        } else {
            this.calledFrom = '/dashboard';
        }


    }

    ngOnInit() {


        this.appService.getApplications(this.globalService.getUser().userId)
            .subscribe(
            appicationsResp => {
                console.log(appicationsResp);
                console.log('application', 'size', this.apps.length);
                if (appicationsResp.length === 1 && (!this.globalService.getUser().globalAdmin)) {
                    this.globalService.setNonAdminSingleUser(true);
                    this.setAppAndRoute(appicationsResp[0]);
                } else {
                    this.apps = appicationsResp;
                }
            },
            err => { console.log(err); }
            );

    }

    validateAcronymn(event: FocusEvent) {

        this.getAllRoles();
        if (this.app.applicationAcronym) {
            this.appService.getApplicationByAcronymn(this.app.applicationAcronym)
                .subscribe(
                application => {
                    if (application && application.applicationId) {
                        this.app = application;
                        this.companyOperation = 'Update';
                        this.getAssignedUsers();

                    } else {
                        this.companyOperation = 'Create';
                    }
                    console.log(application);
                },
                err => { this.companyOperation = 'Create'; console.log(err); }
                );
        }

    }

    submitCustomerInfo(event: Event, formValidated: boolean) {

        console.log('submit in progress' + this.companyInProgress);
        if (!formValidated) {
            return;
        }

        this.companyInProgress = true;
        this.companySubmissionErrorMessage = '';

        if (this.companyOperation === 'Create') {
            this.appService.createApplication(this.app)
                .subscribe(
                application => {
                    this.app = application;
                    console.log('logging app', application);
                    this.companyInProgress = false;
                    // change button operation to update
                    this.companyOperation = 'Update';

                    this.getAssignedUsers();

                },
                err => {
                    console.log('Create Exception', err);
                    this.companyInProgress = false;
                    this.companySubmissionErrorMessage = GlobalConfig.parseException(err);
                }
                );
        } else {
            this.appService.updateApplication(this.app)
                .subscribe(
                application => {
                    this.app = application;
                    console.log(application);
                    this.companyInProgress = false;

                },
                err => {
                    console.log('Update Exception', err);
                    this.companyInProgress = false;
                    this.companySubmissionErrorMessage = GlobalConfig.parseException(err);
                }
                );
        }

    }

    getAssignedUsers() {

        this.users = [];

        this.appService.getAssignedUsers(this.app.applicationId)
            .subscribe(
            users => {
                this.users = users;
                console.log(users);
                this.companyInProgress = false;

            },
            err => {
                console.log('User Fetch Exception', err);
                this.companyInProgress = false;
                this.companySubmissionErrorMessage = GlobalConfig.parseException(err);
            }
            );
    }

    getAllRoles() {
        this.appService.getAllRoles()
            .subscribe(
            roles => {
                this.roles = roles;
                console.log(roles);
                this.companyInProgress = false;

            },
            err => {
                console.log('Role Fetch Exception', err);
                this.companyInProgress = false;
                this.companySubmissionErrorMessage = GlobalConfig.parseException(err);
            }
            );
    }

    searchUser() {

        this.selectedUserCnt = 0;
        this.users = [];

        this.searchInProgress = true;
        this.appService.getUsers(this.userSearchText)
            .subscribe(
            users => {
                this.users = users;
                console.log(users);
                this.searchInProgress = false;

            },
            err => {
                console.log('User Search Exception', err);
                this.searchInProgress = false;
                this.companySubmissionErrorMessage = GlobalConfig.parseException(err);

            }
            );


    }

    assignUser() {

        this.app.users = [];

        for (let user of this.users) {
            if (user.selected) {
                this.app.users.push(user);
            }
        }

        if (this.app.users.length === 0) {
            this.messageModel = new MessageModel();
            this.messageModel.message = 'Please use search criteria and select user';
            this.messageModel.operation = 'userassign';
        } else {

            this.assignInProgress = true;

            this.appService.assignApplicationUsers(this.app)
                .subscribe(
                status => {
                    this.users = [];
                    // console.log(users);
                    this.userAssignMessage = 'User Assigned Successfully...';
                    this.assignInProgress = false;

                },
                err => {
                    console.log('User assign Exception', err);
                    this.assignInProgress = false;
                    this.userAssignMessage = GlobalConfig.parseException(err);

                }
                );
        }


        console.log(this.users);

    }

    delRow(selectedUser: User) {

        this.messageModel = new MessageModel();
        this.messageModel.message = 'are you sure you want to remove it ?';
        this.messageModel.operation = 'remove';
        this.messageModel.carryOver = selectedUser;


    }

    selRow(event: MouseEvent, user: User) {

        let attrName: string = event.srcElement.getAttribute('name');

        // console.log('attrName', attrName);

        if (attrName === 'roleBtn' || attrName === 'delBtn') {
            return;
        }

        user.selected = !user.selected;

        console.log('user selected', user.selected, 'sel cnt ', this.selectedUserCnt);

        if (user.selected) {
            this.selectedUserCnt++;

        } else {
            this.selectedUserCnt--;
        }

    }

    selRole(selectedRole: Role) {


        for (let user of this.users) {
            if (user.selected) {

                if (!user.roles) {
                    user.roles = [];
                }
                let index = user.roles.findIndex(filterRole => filterRole.roleId === selectedRole.roleId);

                if (index < 0) {

                    if (this.userOperation === 'Update') {
                        // frame request elements, fields appid, userid, roleid
                        let _appRequest = new Application();
                        _appRequest.applicationId = this.app.applicationId;

                        let _userRequest = new User();
                        _userRequest.userId = user.userId;

                        let _roleRequest: Role = selectedRole;

                        _userRequest.roles = [];
                        _userRequest.roles.push(_roleRequest);
                        _appRequest.users = [];
                        _appRequest.users.push(_userRequest);

                        this.appService.assignApplicationUserRole(_appRequest)
                            .subscribe(
                            status => {
                                // to map on screen push to user element
                                user.roles.push(selectedRole);
                                // console.log(users);
                                this.userAssignMessage = 'User Role Assigned Successfully...';

                            },
                            err => {
                                console.log('User role assignment Exception', err);
                                this.userAssignMessage = GlobalConfig.parseException(err);

                            }
                            );

                    } else {
                        // map on screen push to user element
                        user.roles.push(selectedRole);
                    }

                }

            }
        }
    }

    unSetRole(selectedUser: User, deSelectedRole: Role) {

        // frame request elements, fields appid, userid, roleid
        let _appRequest = new Application();
        _appRequest.applicationId = this.app.applicationId;

        let _userRequest = new User();
        _userRequest.userId = selectedUser.userId;

        // clean all the roles and set the role which need to remove
        _userRequest.roles = [];
        _userRequest.roles.push(deSelectedRole);

        _appRequest.users = [];
        _appRequest.users.push(_userRequest);

        this.appService.unAssignApplicationUserRole(_appRequest)
            .subscribe(
            status => {
                // console.log(users);
                // set back to screen using user variable
                selectedUser.roles = selectedUser.roles.filter(roleFilter => roleFilter.roleId !== deSelectedRole.roleId);
                this.userAssignMessage = 'User Role Assigned Successfully...';
            },
            err => {
                console.log('UserRole unset Exception', err);
                this.userAssignMessage = GlobalConfig.parseException(err);

            }
            );
    }

    displayAddOrUpdate(value: string) {
        this.userOperation = value;

        this.users = [];
        if (value === 'Update') {
            this.getAssignedUsers();
        }
    }

    resetUserTable() {
        this.users = [];
    }

    doMessageClick(event: any) {

        let whichButton = event.buttonClicked;
        let messageModel: MessageModel = event.messageModel;

        let selectedUser = messageModel.carryOver;

        if (messageModel.operation === 'remove') {
            if (whichButton === 'Ok') {

                if (this.userOperation === 'Update') {

                    let _appRequest = new Application();
                    _appRequest.applicationId = this.app.applicationId;
                    _appRequest.users = [];
                    _appRequest.users.push(selectedUser);

                    this.appService.unAssignApplicationUsers(_appRequest)
                        .subscribe(
                        status => {
                            // console.log(users);
                            this.users = this.users.filter(user => user.userId !== selectedUser.userId);

                        },
                        err => {
                            console.log('User unassign Exception', err);
                            this.assignInProgress = false;
                        }
                        );
                } else {
                    this.users = this.users.filter(user => user.userId !== selectedUser.userId);
                }
            }
        }
    }


    setAppAndRoute(app: Application) {
        console.log('application', app);

        let request = new RequestPk(this.globalService.getUser().userId, app.applicationId);
        this.appService.getRolesForSelectedApplicationAndUser(request)
            .subscribe(
            rolesResp => {
                // console.log(users);
                app.roles = rolesResp;
                this.globalService.setApplication(app);
                this.router.navigate([this.calledFrom]);

            },
            err => {
                console.log('Role fetch based on Application Exception', err);

            }
            );



    }

}
