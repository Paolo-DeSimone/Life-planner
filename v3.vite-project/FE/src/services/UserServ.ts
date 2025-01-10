import { User, UserMembers } from "../models/User";

export class UsersService {
    constructor(private userInstance: User) {
        console.log('User service created for user:', this.userInstance.Getter(UserMembers.name));
    }


}
