import { User, UserMembers } from "../models/User";

export class UsersService {
    constructor(private userInstance: User) {}

    ChangeTMIallocation(NewOMBPerc: number, NewEMBperc: number): void {
        if (NewOMBPerc + NewEMBperc !== 100) {
            throw new Error("La somma delle percentuali deve essere pari al 100%");
        }

        this.userInstance.Setter(UserMembers.OBMpercentage, NewOMBPerc);
        this.userInstance.Setter(UserMembers.EBMpercentage, NewEMBperc);
    }
}
