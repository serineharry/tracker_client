import { Schedule } from './schedule';
export class Userstory {

    userstoryId: number;
    projectId: number;
    applicationId: number;
    userstory: string;
    userstoryDesc: string;
    interfaces: string;
    dependencies: string;
    externalDate: Date;
    comments: string;

    schedules: Schedule[] = [];
}
