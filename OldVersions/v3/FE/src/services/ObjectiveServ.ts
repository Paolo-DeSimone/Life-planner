import { Objective } from "../models/Objective"; // , ObjEnum, ObjMembers
//import { User, UserMembers } from '../models/User';
import { BehaviorSubject, Observer } from "rxjs"; // Observable,

@ClassLogger
@LoggerWithParameters("Ciao sono il logger che richiede un parametro")
/** ObjectiveService
 * ObjectiveService gestisce la logica per la gestione degli obiettivi degli utenti.
 *
 * Un Subject è un Observable ed un Observer contemporaneamente.
 * Un BehaviorSubject è un tipo di Subject che mantiene l'ultimo valore emesso e lo fornisce a nuovi osservatori alla sottoscrizione.
 * objectivesSubject: BehaviorSubject<Objective[]> rappresenta la lista degli obiettivi, aggiornata alla ultima versione/ultimo valore.
 *
 * Il metodo objectives restituisce objectivesSubject ma sotto forma di Observable e non di BehaviorSubject. Così non è possibile cambiare direttamente la lista.
 *
 * Ogni operazione (addObjective, updateObjective, deleteObjective) chiama notifyObjectiveChanges() per notificare gli osservatori.
 */
export class ObjectiveService {
  /**Mappa degli obiettivi, con ID come chiave e Objective come valore.
   */
  private objectivesList: Objective[] = [];

  /**Observable che notifica i cambiamenti nella lista degli obiettivi.
   */
  private objectivesSubject: BehaviorSubject<Objective[]> = new BehaviorSubject<
    Objective[]
  >([]);

  /**Aggiunge un nuovo obiettivo alla lista.
   * @param {Objective} Obj - l'obiettivo da aggiungere
   * @returns {void}
   */
  AddObj(Obj: Objective) {
    this.objectivesList.push(Obj);
    this.objectivesSubject.next(this.objectivesList);
  }

  SubscribeObserver(observer: Observer<Objective[]>) {
    this.objectivesSubject.subscribe(observer);
  }

  // Funzione che restituisce direttamente una Promise
  async fakeDBcallWithPromises1(): Promise<string> {
    console.log("1. fakeDBcallWithPromises1 - Inizio funzione");

    return new Promise((resolve, reject) => {
      console.log("2. fakeDBcallWithPromises1 - Dentro la Promise");

      let boolean = Math.random() > 0.5; // Simula successo o fallimento

      setTimeout(() => {
        if (boolean) {
          console.log("3. fakeDBcallWithPromises1 - Risolvo la Promise");
          resolve("🎉 fakeDBcallWithPromises1: Data received");
        } else {
          console.log("3. fakeDBcallWithPromises1 - Rigetto la Promise");
          reject("❌ fakeDBcallWithPromises1: DB request failed");
        }
      }, 1000);
    });
  }

  //@Logger(fakeDBcallWithPromises2)
  // Funzione che usa async/await e try/catch
  async fakeDBcallWithPromises2(): Promise<string> {
    console.log("1. fakeDBcallWithPromises2 - Inizio funzione");
    try {
      let result = await new Promise<string>((resolve, reject) => {
        console.log("2. fakeDBcallWithPromises2 - Dentro la Promise");

        let boolean = Math.random() > 0.5; // Simula successo o fallimento

        setTimeout(() => {
          if (boolean) {
            console.log("3. fakeDBcallWithPromises2 - Risolvo la Promise");
            resolve("🎉 fakeDBcallWithPromises2: Data received");
          } else {
            console.log("3. fakeDBcallWithPromises2 - Rigetto la Promise");
            reject("❌ fakeDBcallWithPromises2: DB request failed");
          }
        }, 1000);
      });

      console.log("4. fakeDBcallWithPromises2 - Dopo await");
      return result;
    } catch (error) {
      console.error(
        "5. fakeDBcallWithPromises2 - Errore catturato nel catch:",
        error
      );
      throw error; // Rilancio l'errore per permettere al chiamante di gestirlo
    }
  }
}

function ClassLogger(constructor: any) {
  console.log("🔍 Logger Decorator applicato alla classe ->", constructor.name);
}

function LoggerWithParameters(messaggio: string) {
  return function (constructor: any) {
    console.log(messaggio);
    console.log(constructor);
  };
}
