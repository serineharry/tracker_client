import { Role } from './role';
import { User } from './user';
export class Application {

    applicationId: number;
    applicationAcronym: string;
    applicationName: string;
    workingHours: number;
    roles: Role[];
    users: User[];
}
