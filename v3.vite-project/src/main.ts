import { User } from "./models/User";
import { UsersService } from "./services/User";

// Creazione di un utente
const user = new User({
    name: 'Jane',
    surname: 'Doe',
    age: 30,
    TMI: 2000,
});

console.log(user.GetAllocation('OMB')); // Valore calcolato con default 80%
console.log(user.GetAllocation('EMB')); // Valore calcolato con default 20%

// Uso del servizio per cambiare l'allocazione
const userService = new UsersService(user);
userService.ChangeTMIallocation(70, 30);

console.log(user.GetAllocation('OMB')); // Valore aggiornato con 70%
console.log(user.GetAllocation('EMB')); // Valore aggiornato con 30%
