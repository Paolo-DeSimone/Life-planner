const U = new Utilities();
U.generateYearsHeaders(5, "gridHeaders")

// Istanza del progetto
const projectInstance = new Project("Progetto AAAAAAAAAAAABBBBBBBB", "Descrizione", "2024-12-31", "Categoria", 100);

const montlybudgetObserver = new montlybudget();
projectInstance.addObserver(montlybudgetObserver)

// Assegna l'evento click
document.getElementById("addNewProject").addEventListener("click", () => projectInstance.Add());

const originalMethod = new User();
originalMethod.displayUserInfo();  // Chiamato sul metodo sovrascritto nella classe figlia

const override = new montlybudget();
override.displayUserInfo();  // Chiamato sul metodo sovrascritto nella classe figlia


/*SPUNTI PER IMPLEMENTARE IL JS ASINCRONO:
Studiare JavaScript asincrono è il passo logico successivo. Alcuni aspetti da considerare per ampliare il progetto:

Simula operazioni asincrone:

Ad esempio, caricare i dati di Project da un'API simulata usando fetch, o gestire salvataggi sul server.
Promise e Async/Await:

Integra operazioni asincrone (es. calcoli complessi o richieste di rete) utilizzando queste tecniche.
Observer pattern + asincronia:

Usa il sistema degli osservatori per reagire a eventi asincroni. Ad esempio, notifyObserver potrebbe essere chiamato dopo che un dato viene recuperato da un'API.
Error handling asincrono:

Gestisci errori simulando fallimenti di rete o altre problematiche. */