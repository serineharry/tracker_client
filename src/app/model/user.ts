import { Role } from './role';

export class User {

    userId: number;
    username: string;
    password: string;
    newpassword: string;
    lastName: string;
    firstName: string;
    globalAdmin: number;
    selected = false;
    emailAddress: string;
    enabled: number;
    roles: Role[];

}
