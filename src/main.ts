// this file contains ONLY logic. Implementations inside classes.
import { User, UserNS } from "./Classes/User.js";
import { Observable, fromEvent } from 'rxjs';



// TEST FUNZIONAMENTO CLASSE USER
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



/* Spiegazione Observable, confermato e migliorato da ChatGPT

Tutto parte dalla necessità di dover fare X quando succede Y. 
X viene chiamato Observer (detto "consumatore di dati"), e Y Observable (detto "fornitore di dati").

Ci sono 3 modi principali per lavorare con gli Observable: 

METODO 1: Creare un Observable personalizzato usando `new Observable()`:
  - Dentro le graffe si definisce come vengono generati i dati (Y) e quando devono essere inviati agli Observer.
  - L'Observable "falso" (controllato manualmente dallo sviluppatore) emette dati usando `next()` e gli Observer reagiscono con `subscribe()`. 
  - Utile quando i dati non dipendono da eventi esterni ma da logica personalizzata.

METODO 2: Usare operatori come `fromEvent`:
  - Si identifica chiaramente Y (ad esempio, un evento DOM come un click).
  - L'Observable viene creato automaticamente e X (la logica da eseguire) può essere definito più avanti nel codice, dentro `subscribe()`.

METODO 3: Usare un `Subject`:
  - Un `Subject` è sia un Observable (fornisce dati agli Observer) sia un Observer (può ricevere dati con `next()`).
  - È particolarmente utile quando i dati devono essere sia generati manualmente che distribuiti a più Observer.

Questa è la base del funzionamento.

Inoltre, esistono molte parole chiave (operatori) che permettono di manipolare il comportamento degli Observable, ad esempio:
  - `next(value)`: Emette un nuovo dato verso tutti gli Observer iscritti.
  - `merge()`: Combina più Observable (più Y) per applicare la stessa logica (X) agli eventi provenienti da ciascuno di essi.
  - `map()`: Trasforma i dati emessi da un Observable prima di passarli agli Observer.
  - `filter()`: Permette di filtrare i dati emessi e inviare solo quelli che soddisfano una certa condizione.

In sintesi:
Ogni volta che un Observable o un Subject emette nuovi dati (con `next()`), tutti gli Observer iscritti tramite `subscribe()` eseguono la logica che hanno definito.
*/


//METODO 1 PER USARE OBSERVABLE
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



//METODO 2 PER USARE OBSERVABLE
const button = document.querySelector('#menuBtn');
if (button) {
  const clickObservable = fromEvent(button, 'click');
  clickObservable.subscribe((event) => {
    console.log('Menu button clicked!', event);
  });
} else {
  console.error('Elemento con id "menuBtn" non trovato!');
}



//METODO 3 PER USARE OBSERVABLE
user.getMembersObservable().subscribe((members) => {
  console.log('Membri aggiornati:', members);
});

user.setMember(UserNS.MembersNames.Name, 'Mario');
