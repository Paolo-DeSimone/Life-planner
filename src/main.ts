// this file contains ONLY logic. Implementations inside classes.
import { User, UserNS } from "./Classes/User.js";

const row = {
    2: 1,
    name: "John",
    age: 30,
    boolean: true
  };

const user = new User("Paolo", "De Simone", 25, 1500,row);

// Utilizzando l'enum per accedere in modo sicuro ai membri
console.log(user.getMember(UserNS.ClassMembers.Name));
user.setMember(UserNS.ClassMembers.Name, "44");
console.log(user.getMember(UserNS.ClassMembers.Name)); 
console.log(user.getMember(UserNS.ClassMembers.Data)); 
