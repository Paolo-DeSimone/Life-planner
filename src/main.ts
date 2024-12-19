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

// user.setMember(UserNS.ClassMembers.Name, "Paolo");

console.log(
  user.getMember(UserNS.ClassMembers.Name) +
    " " +
    user.getMember(UserNS.ClassMembers.Surname)
);
console.log(user.getMember(UserNS.ClassMembers.Data));




/*Spiegazione Observable, confermata da Chat Gpt

Tutto parte dalla necessità di dover fare X quando succede Y. 
Ci son 2 modi di agire: o decidi Y creando un new Observable(){} e dentro le sue graffe decidi X. In questo caso Y è "fasullo" perché decido io sviluppatore quando deve essere chiamato l'observable usando SubScribe.
Il secondo modo, più simile al classico addEventListener, è usare il fromEvent(button, 'click') il quale identifica chiaramente Y, facendo si che X venga deciso più avanti nel codice, senza doverlo implementare da subito come con new Observable(){}

Questa che ho spiegato è la base. Poi ci sono tutta una serie di parole chiave che permettono di manipolare X ed Y, tipo next(), che in poche parole contiene al suo interno quel che deve essere eseguito, oppure merge(),  che invece unisce più Y assieme per applicarci la stessa X ossia le cose da fare.*/

const button = document.querySelector('#menuBtn');

// Verifica che il pulsante non sia null
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

  // Cleanup: Quando il sottoscrittore si disconnette, pulisci il timer
  return () => {
    clearInterval(interval);
    console.log('Observable stopped');
  };
});

const subscription = observable.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Observable completed'),
});

// Disconnettersi dopo 5 secondi
setTimeout(() => subscription.unsubscribe(), 5000);
