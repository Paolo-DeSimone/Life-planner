import { User, UserMembers } from "./models/User";
import { Objective, ObjEnum, ObjMembers } from "./models/Objective";
import { ObjectiveService } from "./services/ObjectiveServ";
import { Observer } from "rxjs";

/** Test per classe User, passati il 04.01. Scommentare questa riga e la sua chisura per ri-eseguirli,

 // 1. Creazione di un utente con percentuali standard di 80% e 20%
const user1 = new User({
    name: 'Alice',
    surname: 'Brown',
    age: 28,
    TMI: 2000,
    OBMpercentage: 80,
    EBMpercentage: 20,
});

console.log("--- User 1: Creazione con percentuali standard (80% - 20%) ---");
console.log("TMI:", user1.Getter(UserMembers.TMI));
console.log("OMB:", user1.Getter(UserMembers.OMB));
console.log("EMB:", user1.Getter(UserMembers.EMB));
console.log("OBMpercentage:", user1.Getter(UserMembers.OBMpercentage));
console.log("EBMpercentage:", user1.Getter(UserMembers.EBMpercentage));

// 2. Creazione di un altro utente e modifica dei valori
const user2 = new User({
    name: 'Bob',
    surname: 'Smith',
    age: 35,
    TMI: 3000,
    OBMpercentage: 70,
    EBMpercentage: 30,
    generalData: {a:1},
    OMB: 1111111111111111111, // verifico che il programma non permetta l'aggiormaneto diretto di OMB e EMB
    EMB: 1111111111111111111
});

console.log("\n--- User 2: Stato Iniziale ---");
console.log("TMI:", user2.Getter(UserMembers.TMI));
console.log("OMB:", user2.Getter(UserMembers.OMB));
console.log("EMB:", user2.Getter(UserMembers.EMB));
console.log("OBMpercentage:", user2.Getter(UserMembers.OBMpercentage));
console.log("EBMpercentage:", user2.Getter(UserMembers.EBMpercentage));

// Modifica TMI
user2.Setter(UserMembers.TMI, 4000);
console.log("\n--- User 2: Dopo modifica TMI (4000) ---");
console.log("TMI:", user2.Getter(UserMembers.TMI));
console.log("OMB:", user2.Getter(UserMembers.OMB));
console.log("EMB:", user2.Getter(UserMembers.EMB));
console.log("OBMpercentage:", user2.Getter(UserMembers.OBMpercentage));
console.log("EBMpercentage:", user2.Getter(UserMembers.EBMpercentage));

// Modifica percentuali OBM e EMB
user2.Setter(UserMembers.OBMpercentage, 60);
console.log("\n--- User 2: Dopo modifica OBMpercentage (60%) ---");
console.log("TMI:", user2.Getter(UserMembers.TMI));
console.log("OMB:", user2.Getter(UserMembers.OMB));
console.log("EMB:", user2.Getter(UserMembers.EMB));
console.log("OBMpercentage:", user2.Getter(UserMembers.OBMpercentage));
console.log("EBMpercentage:", user2.Getter(UserMembers.EBMpercentage));

 */

// Test per classe Objective ed Observabe
const Paolo = new User({
    name: 'Paolo',
    surname: 'De Simone',
    age: 25,
    TMI: 1500,
    OBMpercentage: 80,
    EBMpercentage: 20,
});

console.log(Paolo.Getter(UserMembers.name))

let ObjectiveBuyHome : ObjMembers= {
    [ObjEnum.name]: "BuyHome",          
    [ObjEnum.startDate]: new Date("1999-02-22"), 
    [ObjEnum.endDate]: new Date("1999-02-23"), 
}

const newObj = new Objective(Paolo,ObjectiveBuyHome)



const observer: Observer<Objective[]> = {
    next: (data: Objective[]) => {
        console.log("Observer si è sottoscritto e questi sono i suoi obiettivi:");
        // Itera sull'array di obiettivi per stampare i dati
        data.forEach(obj => {
            console.log(obj);  // O usa un campo specifico come obj.name se vuoi mostrare una proprietà specifica
        });
    },
    error: (err: any) => console.error(err),
    complete: () => console.log('Completed')
}
const ObjSerice = new ObjectiveService()

ObjSerice.SubscribeObserver(observer)

ObjSerice.AddObj(newObj)

console.log("------------------");
console.log("------------------");
console.log("------------------");

const service = ObjSerice;

console.log("MAIN: Inizio chiamata fakeDBcallWithPromises1");

service.fakeDBcallWithPromises1()
    .then((data) => {
        console.log("MAIN: ✅ Successo in fakeDBcallWithPromises1 ->", data);
    })
    .catch((err) => {
        console.error("MAIN: ❌ Errore in fakeDBcallWithPromises1 ->", err);
    });

console.log("MAIN: Fine chiamata fakeDBcallWithPromises1 (Non ha aspettato la Promise)");

(async () => {
    console.log("MAIN: Inizio chiamata fakeDBcallWithPromises2");

    try {
        const data = await service.fakeDBcallWithPromises2();
        console.log("MAIN: ✅ Successo in fakeDBcallWithPromises2 ->", data);
    } catch (error) {
        console.error("MAIN: ❌ Errore in fakeDBcallWithPromises2 ->", error);
    }

    console.log("MAIN: Fine chiamata fakeDBcallWithPromises2 (Ha aspettato la Promise)");
})();

console.log("ciao")