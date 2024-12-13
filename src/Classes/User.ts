export class User {
  private members: Record<keyof UserNS.MemberTypes, any>;
  constructor(
    name: string,
    surname: string,
    age: number,
    TMI: number,
    data?: Record<string, any>
  ) {
    this.members = { name, surname, age, TMI, data };
  }

  public getMember<K extends keyof UserNS.MemberTypes>(
    member: K
  ): UserNS.MemberTypes[K] {
    return this.members[member];
  }

  public setMember<K extends keyof UserNS.MemberTypes>(
    member: K,
    value: UserNS.MemberTypes[K]
  ): void {
    if (typeof value !== typeof this.members[member]) {
      throw new Error(
        `Invalid type for ${member}. Expected ${typeof this.members[member]}.`
      );
    }
    this.members[member] = value;
    UserNS.test()
  }
}

export namespace UserNS {
  export enum ClassMembers {
    Name = "name",
    Surname = "surname",
    Age = "age",
    TMI = "TMI",
    Data = "data",
  }

  // Mappa dei tipi per ogni membro
  export type MemberTypes = {
    [UserNS.ClassMembers.Name]: string;
    [UserNS.ClassMembers.Surname]: string;
    [UserNS.ClassMembers.Age]: number;
    [UserNS.ClassMembers.TMI]: number;
    [UserNS.ClassMembers.Data]: Record<string, any> | undefined;
  };

  export function test(){}

}
