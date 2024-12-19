// this file contains ONLY logic. Implementations inside classes.
import { User, UserNS } from "./Classes/User.js";

const row = {
  2: 1,
  name: "John",
  age: 30,
  boolean: true,
  a: { 2: 1, name: "John", age: 30, boolean: true },
};

const user = new User("Paolo", "De Simone", 25, 1500, row);

// user.setMember(UserNS.ClassMembers.Name, "Paolo");

console.log(
  user.getMember(UserNS.ClassMembers.Name) +
    " " +
    user.getMember(UserNS.ClassMembers.Surname)
);
console.log(user.getMember(UserNS.ClassMembers.Data));

import { Observable } from 'rxjs';

const observable = new Observable((observer) => {
  observer.next('Hello, Vite + RxJS!');
  observer.complete();
});

observable.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Observable completed'),
});
