export class Resource {

    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    totalAvailableHrs: number;
    perDayAvailableHrs: number;
    hoursAssigned: number;
    mode = 'DELETE';
    taskId: number;

    // used on userstory
    progress: number;
    reviewProgress: number;
    otherProgress: number;


}
