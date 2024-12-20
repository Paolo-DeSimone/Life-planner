import { Subject, Observable } from 'rxjs';

export class User {
  private members: Record<keyof UserNS.ClassMembers, any>;
  private membersSubject: Subject<Record<keyof UserNS.ClassMembers, any>>;

  constructor(
    name: string,
    surname: string,
    age: number,
    TMI: number,
    data?: Record<string, any>
  ) {
    this.members = {
      name,
      surname,
      age,
      TMI,
      OMB: 0, 
      OBMpercentage: 0.8,
      EMB: 0,
      EBMpercentage: 0.2,
      data: data ?? {},
    };
    this.updateBudgets();
    this.membersSubject = new Subject();
  }

  private updateBudgets(): void {
    // Aggiorna i valori di OMB ed EMB in base alle percentuali
    this.members.OMB = this.members.TMI * this.members.OBMpercentage;
    this.members.EMB = this.members.TMI * this.members.EBMpercentage;
  }

  public getMembersObservable(): Observable<Record<keyof UserNS.ClassMembers, any>> {
    return this.membersSubject.asObservable();
  }

  public getMember<K extends keyof UserNS.ClassMembers>(
    member: K
  ): UserNS.ClassMembers[K] {
    return this.members[member];
  }

  public setMember<K extends keyof UserNS.ClassMembers>(
    member: K,
    value: UserNS.ClassMembers[K]
  ): void {
    const controlledMembers = [ // Variabile creata per non fare un IF troppo lungo
      UserNS.MembersNames.TMI,
      UserNS.MembersNames.OBMpercentage,
      UserNS.MembersNames.EBMpercentage,
      UserNS.MembersNames.OMB,
      UserNS.MembersNames.EMB,
    ];
    if (controlledMembers.includes(member)) {
      UserNS.updateTMIorEMBorOMB(this.members, member, value);
      this.updateBudgets();
    } else {
      if (typeof value !== typeof this.members[member]) {
        throw new Error(
          `Invalid type for ${member}. Expected ${typeof this.members[member]}.`
        );
      }
      this.members[member] = value;
    }

    this.membersSubject.next(this.members);
  }
}

export namespace UserNS {
  export enum MembersNames {
    Name = "name",
    Surname = "surname",
    Age = "age",
    TMI = "TMI",
    OMB = "OMB",
    OBMpercentage = "OBMpercentage",
    EMB = "EMB",
    EBMpercentage = "EBMpercentage",
    Data = "data",
  }

  export type ClassMembers = {
    [UserNS.MembersNames.Name]: string;
    [UserNS.MembersNames.Surname]: string;
    [UserNS.MembersNames.Age]: number;
    [UserNS.MembersNames.TMI]: number;
    [UserNS.MembersNames.OMB]: number;
    [UserNS.MembersNames.OBMpercentage]: number;
    [UserNS.MembersNames.EMB]: number;
    [UserNS.MembersNames.EBMpercentage]: number;
    [UserNS.MembersNames.Data]: Record<string, any> | undefined;
  };

  export function updateTMIorEMBorOMB<K extends keyof ClassMembers>(
    members: Record<keyof ClassMembers, any>,
    member: K,
    value: ClassMembers[K]
  ): void {
    const TMI = MembersNames.TMI;
    const OBMpercentage = MembersNames.OBMpercentage;
    const EBMpercentage = MembersNames.EBMpercentage;

    if (member === OBMpercentage) {
      const newEBMpercentage = 1 - (value as number);
      if (newEBMpercentage < 0 || newEBMpercentage > 1) {
        throw new Error(`Invalid value. OBMpercentage + EBMpercentage must equal 1.`);
      }
      members[OBMpercentage] = value;
      members[EBMpercentage] = newEBMpercentage;
    } else if (member === EBMpercentage) {
      const newOBMpercentage = 1 - (value as number);
      if (newOBMpercentage < 0 || newOBMpercentage > 1) {
        throw new Error(`Invalid value. OBMpercentage + EBMpercentage must equal 1.`);
      }
      members[EBMpercentage] = value;
      members[OBMpercentage] = newOBMpercentage;
    } else if (member === TMI) {
      members[TMI] = value;
    }else {
      throw new Error(`You can't set ${member} directly.`);
    }
  }
}
