export class RequestPk {

    applicationId: number;
    userId: number;

    constructor(userid: number, appid: number) {
        this.userId = userid;
        this.applicationId = appid;
    }
}
