import { User } from './user';
export class Reminder {

    reminderId: number;
    applicationId: number;
    reminderType: string;
    isBefore: number;
    isAfter: number;
    majorRelease: number;
    minorRelease: number;
    days: number;
    weekdays: string[];
    monthdays: number[];
    phase: string;
    notifyOwner: number;
    users: User[];
    content: string;

}
