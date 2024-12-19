// this file contains ONLY logic. Implementations inside classes.
import { User, UserNS } from "./Classes/User.js";
import { Observable, fromEvent } from 'rxjs';

const row = {
  2: 1,
  name: "John",
  age: 30,
  boolean: true,
  a: { 2: 1, name: "John", age: 30, boolean: true },
};

const user = new User("Paolo", "De Simone", 25, 1500, row);

console.log(
  user.getMember(UserNS.MembersNames.Name) +
    " " +
    user.getMember(UserNS.MembersNames.Surname)
);
console.log(user.getMember(UserNS.MembersNames.Data));

const button = document.querySelector('#menuBtn');

if (button) {
  const clickObservable = fromEvent(button, 'click');
  clickObservable.subscribe((event) => {
    console.log('Menu button clicked!', event);
  });
} else {
  console.error('Elemento con id "menuBtn" non trovato!');
}

const observable = new Observable((observer) => {
  let counter = 0;
  const interval = setInterval(() => {
    observer.next(counter++); // Emesso un valore incrementale ogni secondo
  }, 1000);

  return () => {
    clearInterval(interval);
    console.log('Observable stopped');
  };
});

const subscription = observable.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Observable completed'),
});

setTimeout(() => subscription.unsubscribe(), 5000);
