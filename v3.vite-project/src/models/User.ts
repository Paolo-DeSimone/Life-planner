export enum UserMembers {
    name = "name",
    surname = "surname",
    age = "age",
    TMI = "TMI",
    OBMpercentage = "OBMpercentage",
    EBMpercentage = "EBMpercentage",
    generalData = "generalData",
}

type UserMemberWithTypes = { 
    [UserMembers.name]: string;
    [UserMembers.surname]: string;
    [UserMembers.age]: number;
    [UserMembers.TMI]: number;
    [UserMembers.OBMpercentage]?: number;
    [UserMembers.EBMpercentage]?: number;
    [UserMembers.generalData]?: Record<string, any>;
}

export class User {
    private OMB: number = 0;
    private EMB: number = 0;

    constructor(private members: UserMemberWithTypes) {
        const { OBMpercentage, EBMpercentage } = this.members;

        this.members.OBMpercentage = OBMpercentage ?? 80; // Default 80%
        this.members.EBMpercentage = EBMpercentage ?? 20; // Default 20%

        this.calculateAllocations();
    }    

    private calculateAllocations(): void {
        const TMI = this.members.TMI;
        this.OMB = (TMI * (this.members.OBMpercentage ?? 80)) / 100;
        this.EMB = (TMI * (this.members.EBMpercentage ?? 20)) / 100;
    }

    Getter(member: UserMembers, getAllMembers = false): UserMemberWithTypes[keyof UserMemberWithTypes] | UserMemberWithTypes {
        return getAllMembers ? this.members : this.members[member];
    }

    Setter<K extends keyof UserMemberWithTypes>(member: K, value: UserMemberWithTypes[K]): void {
        if (member in this.members) {
            this.members[member] = value;
            if (member === UserMembers.TMI || member === UserMembers.OBMpercentage || member === UserMembers.EBMpercentage) {
                this.calculateAllocations();
            }
        } else {
            throw new Error(`Property ${member} does not exist on UserMembers.`);
        }
    }

    GetAllocation(type: 'OMB' | 'EMB'): number {
        return type === 'OMB' ? this.OMB : this.EMB;
    }
}
