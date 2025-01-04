import { User, UserMembers } from "./models/User";

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
