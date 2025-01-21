import { User, UserMembers } from './User';

export enum ObjEnum {
    id = "id",
    name = "name",
    startDate = "startDate",
    endDate = "endDate",
    generalData = "generalData",
    completed = "completed"
}

export type ObjMembers = {
    [ObjEnum.id]?: `${string}-${string}-${string}-${string}-${string}`;          
    [ObjEnum.name]: string;          
    [ObjEnum.startDate]: Date;   
    [ObjEnum.endDate]: Date;   
    [ObjEnum.generalData]?: Record<string, any>;
    [ObjEnum.completed]?: boolean;   
}

export class Objective {
    private user: User;
    private members: ObjMembers;

    constructor(user: User, members: Omit<ObjMembers, ObjEnum.id | ObjEnum.completed>) {
        this.user = user;
        this.members = {
            ...members,
            id: crypto.randomUUID(),
            completed : false,
        };

        console.log(`🎯 Objective created: ${this.members.id}`);
        console.log(`👤 User: ${this.user.Getter(UserMembers.id)}, Data:`, this.members);
    }

    /**
     * Metodo generico per ottenere una proprietà dell'Objective.
     */
    public Getter<K extends keyof ObjMembers>(key: K): ObjMembers[K] {
        return this.members[key];
    }

    /**
     * Metodo generico per impostare una proprietà dell'Objective.
     */
    public Setter<K extends keyof ObjMembers>(key: K, value: ObjMembers[K]): void {
        this.members[key] = value;
    }
}
