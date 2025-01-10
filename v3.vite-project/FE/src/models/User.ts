export enum UserMembers {
    id = "id",
    name = "name",
    surname = "surname",
    age = "age",
    TMI = "TMI",
    OBMpercentage = "OBMpercentage",
    EBMpercentage = "EBMpercentage",
    generalData = "generalData",
    OMB = "OMB",
    EMB = "EMB",
}

export type UserMemberWithTypes = {
    [UserMembers.id]?: string;
    [UserMembers.name]: string;                     
    [UserMembers.surname]: string;                  
    [UserMembers.age]: number;                      
    [UserMembers.TMI]: number;                      
    [UserMembers.OBMpercentage]: number;           
    [UserMembers.EBMpercentage]: number;           
    [UserMembers.generalData]?: Record<string, any>;
    [UserMembers.OMB]?: number; // Mai valorizzato direttamente: calculateOMBandEMB lo sovrascrive. Inserito qui solo perché ci son tutti gli altri membri.
    [UserMembers.EMB]?: number; // Mai valorizzato direttamente: calculateOMBandEMB lo sovrascrive. Inserito qui solo perché ci son tutti gli altri membri.
}

/** The class represents the application user. 
 * 
 * Here his Total Montly Income (TMI) is defined, along with his Objective Montly Budget (OMB) and his Expances Montly budget (OMB).
 * OMB represents the money that the user wants to save each month for his objectives.
 * EMB represents the money that the user can spend each month on any kind of expance (holidays, clothes, clubs...).
 * 
 * The logic implemented here ensures that TMI = OMB + EMB is always a true equation and that OMB and EMB are never setted directly 
 * but always using calculate_TMI_OMB_EMB(), after needed checks are done.
 */
export class User {
    constructor(private members: UserMemberWithTypes) {
        this.members.id = crypto.randomUUID()
        this.calculate_TMI_OMB_EMB(members.TMI, members.OBMpercentage, members.EBMpercentage); 
    }    

    /** 
     * Get a member or all members of class User.
     * @param {UserMembers} member - The member to get.
     * @param {boolean} getAllMembers - If true, returns all members.
     * @returns {UserMemberWithTypes | UserMemberWithTypes[keyof UserMemberWithTypes]}
     */
    Getter(member: UserMembers, getAllMembers = false): UserMemberWithTypes | UserMemberWithTypes[keyof UserMemberWithTypes] {
        return getAllMembers ? this.members : this.members[member];
    }

    /** 
     * Set a member of class User.
     * @param {UserMembers} member - The member to set.
     * @param {UserMemberWithTypes[UserMembers]} value - The value to set.
     * @throws {Error} - If the member does not exist.
     * @returns {void}
     * @example
     * user.Setter(UserMembers.OBMpercentage, 70);
    */
    Setter<K extends keyof UserMemberWithTypes>(member: K, value: UserMemberWithTypes[K]): void {
        if (!(member in this.members)) {
            throw new Error(`Property ${member} does not exist on UserMembers.`);
        }

        if (member === UserMembers.OMB || member === UserMembers.EMB || member === UserMembers.id) {
            throw new Error(`Property ${member} must not be modified directly.`);
        }

        if (member === UserMembers.TMI) {
            this.calculate_TMI_OMB_EMB(value as number, this.members.OBMpercentage, this.members.EBMpercentage);
        } else if (member === UserMembers.OBMpercentage) {
            this.updatePercentages(value as number, 100 - (value as number));
        } else if (member === UserMembers.EBMpercentage) {
            this.updatePercentages(100 - (value as number), value as number);
        } else {
            this.members[member] = value;
        }
    }

    /**
     * Calculate OMB and EMB values.
     * @param {number} TMI - Total Monthly Income.
     * @param {number} OBMperc - OMB percentage.
     * @param {number} EMBperc - EMB percentage.
     * @returns {void}
     */
    private calculate_TMI_OMB_EMB(TMI: number, OBMperc: number, EMBperc: number): void {
        this.check_TMI_OMB_EMB(OBMperc, EMBperc, TMI);
        this.members.OMB = (TMI * OBMperc) / 100;
        this.members.EMB = (TMI * EMBperc) / 100;
    }

    /**
     * Check if OBM and EMB percentages sum up to 100.
     * @param {number} OBMperc - OMB percentage.
     * @param {number} EMBperc - EMB percentage.
     * @throws {Error} - If percentages do not sum up to 100.
     */
    private check_TMI_OMB_EMB(OBMperc: number, EMBperc: number, TMI?: number): void {
        if (TMI as number < 0) {
            throw new Error("TMI must be at least 0. 0 means you have no montly income at the moment.");
        }
        if (OBMperc + EMBperc !== 100) { // Questo controllo include già quello che le percentuali NON siano negative
            throw new Error("OBMpercentage and EMBpercentage must sum up to 100.");
        }
    }

    /**
     * Update OBM and EMB percentages and recalculate values.
     * @param {number} OBMperc - OMB percentage.
     * @param {number} EMBperc - EMB percentage.
     * @returns {void}
     */
    private updatePercentages(OBMperc: number, EMBperc: number): void {
        this.check_TMI_OMB_EMB(OBMperc, EMBperc);
        this.members.OBMpercentage = OBMperc;
        this.members.EBMpercentage = EMBperc;
        this.calculate_TMI_OMB_EMB(this.members.TMI, OBMperc, EMBperc);
    }
}
