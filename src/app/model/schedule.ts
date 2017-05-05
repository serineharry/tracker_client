import { Resource } from './resource';
export class Schedule {

    scheduleId: number;
    userstoryId: number;
    phase = '';
    days: number;

    startDate: Date;
    // javascript Date assignment not working. 
    // html5 expecting in yyyy-MM-dd. so changing from date to String
    // endDate: Date;
    endDate: string;

    implementationStatus: string;
    reviewStatus: string;
    testingStatus: string;
    comments: string;
    // used on Resources component to fetch based on schedule
    applicationId: number;
    resources: Resource[];

    // used on schedule search locator on task screen
    projectUid: string;
    userstory: string;
    userstoryDesc: string;


}
