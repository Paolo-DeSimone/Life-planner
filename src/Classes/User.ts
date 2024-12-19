import { Observable, Subject } from 'rxjs';

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
    this.members = { name, surname, age, TMI, data };
    this.membersSubject = new Subject();
  }

  // Osservabile che emette ogni volta che i membri cambiano
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
    if (typeof value !== typeof this.members[member]) {
      throw new Error(
        `Invalid type for ${member}. Expected ${typeof this.members[member]}.`
      );
    }
    this.members[member] = value;
    
    // Notifica l'aggiornamento
    this.membersSubject.next(this.members);
  }
}

export namespace UserNS {
  export enum MembersNames {
    Name = "name",
    Surname = "surname",
    Age = "age",
    TMI = "TMI",
    Data = "data",
  }

  // Mappa dei tipi per ogni membro
  export type ClassMembers = {
    [UserNS.MembersNames.Name]: string;
    [UserNS.MembersNames.Surname]: string;
    [UserNS.MembersNames.Age]: number;
    [UserNS.MembersNames.TMI]: number;
    [UserNS.MembersNames.Data]: Record<string, any> | undefined;
  };

  export function test() {}
}
