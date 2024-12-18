class User<JSONFormatData extends { [key: string]: any }> {
    // Proprietà protected
    protected name: string;
    protected surname: string;
    protected age: number;
    protected TMI: number;
    protected data?: JSONFormatData;
  
    constructor(
      name: string,
      surname: string,
      age: number,
      TMI: number = 0,
      data?: JSONFormatData
    ) {
      this.name = name;
      this.surname = surname;
      this.age = age;
      this.TMI = TMI;
      this.data = data;
    }
  
    // Metodo get
    public getMember(member: User.ClassMembers): any {
      return this[member as keyof this];
    }
  
    // Metodo set
    public setMember(member: User.ClassMembers, value: any): void {
      if (member in this) {
        this[member as keyof this] = value;
      } else {
        throw new Error(`La proprietà ${member} non esiste.`);
      }
    }
  }
  
  // Namespace per l'Enum (simula l'incapsulamento)
  namespace User {
    export enum ClassMembers {
      Name = "name",
      Surname = "surname",
      Age = "age",
      TMI = "TMI",
      Data = "data"
    }
  }
  
  // Esempio di utilizzo
  const user = new User("Paolo", "De Simone", 25, 1500);
  
  // Accesso all'enum dal namespace della classe
  console.log(user.getMember(User.ClassMembers.Name)); // "Paolo"
  user.setMember(User.ClassMembers.Age, 26);
  console.log(user.getMember(User.ClassMembers.Age));  // 26
  
export default User;
