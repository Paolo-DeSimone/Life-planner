# Come funzionano i controller in C#

I controller in C# sono una parte fondamentale del pattern MVC ossia Model-View-Controller che, in breve, consiste nel suddividere logicamente il programma in omonime cartelle con le seguenti funzioni:

- Models: contiene la definizione degli oggetti, effettuata tramite le classi della OOP.

- Views: contiene la rappresentazione visiva dei dati, cioè come l'utente li vede.

- Controllers: contiene la logica per manipolare i dati. La logica è implementata tramite API.

Esempio:
Una pagina web con una griglia (la view) mostra i voti di uno studente, che sono un tipo specifico di dato definito, cioè creato, nel programma, usando una classe tipo "Student"("Student" è il model). 

Il fatto che i voti siano mostrati quando la pagina si apre, od aggiornati se l'utente inserisce un nuovo voto, dipende tutto dalla logica del programma, che è gestita nei controllers tramite l'uso di API.

# Cosa sono le API

Le API (Application Programming Interface) sono metodi di una classe, chiamati "endpoint", che fanno da ponte tra il FE ed il BE oppure tra BE ed il database usando protocolli HTTP ed HTTPS.

Sono di 4 tipi, ognuno corrispondente ad una operazione CRUD: GET(Read), POST(Create), PUT(Update), DELETE(Delete). 

Per convenzione, gestiscono 2 tipi di dati: JSON oppure XML.

Un progetto API è raggiungibile ed utilizzabile, come per il front-end", su un suo "sito web", con un certo URL. Tale URL sarà ciò che il FE, nei suoi controller, chiamerà (tramite librerie o metodi come fetch od axios) per farsi restituire dei dati da mostrare all'utente.

## Come si compone l'URL su cui vengono servite le api.

Dopo aver avviato il progetto con:

`npm run start-all`

è possibile testare le proprie API aprendo il browser all'indirizzo: https://localhost:5001/api/Home/getall ed andando dentro la console, tab "rete", e si vedrà la chiamata a con status getall 200 (OK)

Vediamo perché è possibile:

- https://localhost:5001 : protocollo e porta son definiti in Properties\launchSettings.json ed in Program.cs

- /api/Home/getall : è definito dentro il file del singolo controller, nel nostro caso: controllers\apiTest.cs. Qui infatti ci sono i seguenti comandi:

`
[Route("api/[controller]")]
[ApiController]
public class HomeController : ControllerBase
{
    [HttpGet("getall")] 
    public IActionResult Get()
    {
        return Ok("LifePlanner API is running!");
    }
}
`

NOTA: nell'url è scritto "Home" e non "HomeController" perchè, in automatico, DOTNET rimuove la scritta "Controller". è quindi convenzione nominare il proprio controller come "MioNomeController", per avere la route "/MioNome/

Se vogliamo sovrascrivere questo comportamento, al posto di `[Route("api/[controller]")]` scriviamo `[Route("api/customName")]


## L'aiuto che ci da il "ControllerBase"

Ogni controller creato in DOTNET, nel nostro caso "HomeController", dovrebbe estendere la classe "ControllerBase".

Questo perché essa fornisce fornisce una serie di metodi utili per costruire le API, come:

- Ok(): Restituisce una risposta HTTP 200 con i dati che vuoi inviare.

- BadRequest(): Restituisce una risposta HTTP 400 in caso di errore di validazione o richiesta malformata.

- NotFound(): Restituisce una risposta HTTP 404 quando l'oggetto richiesto non è stato trovato.

- Unauthorized(): Restituisce una risposta HTTP 401 quando l'utente non è autorizzato a fare una determinata richiesta.

Questi metodi semplificano la gestione delle risposte HTTP in modo che tu non debba scrivere manualmente tutte le informazioni di stato.

## L'aiuto che ci da il "Controller"

"ControllerBase" estende "Controller".
Quest'ultimo può essere usato se il nostro controller deve gestire anche le viste. 
Per gestire le viste lato BE, DOTNET ha creato Razor, una tecnologia che permette di restituire al FE delle pagine HTML, anche dinamiche ossia con cicli e condizioni. Ma non approfondirò perché non mi interessa questa tecnologia.

## L'aiuto che ci da  Microsoft.AspNetCore.Mvc;

Importare questo namespace è utile perché gestisce cose come:

- Routing: comandi come [Route("api/[controller]")] esistono grazie ed esso.

- Validazione dati: fatta frequentemente, per esempio, tramite l'interfaccia IActionResult siamo in grado di restituire al client qualunque risposta tipo 200, 404...il tutto con 1 solo "tipo" ossia IActionResult. 

Nota: IActionResult è così usato come tipo restituito dagli endpoint, al posto di tipi come "object" o "string" o tipi custom perché le API nascono per servire dati ad N applicazioni su N sistemi operativi.

Visto l'obiettivo, serviva uno standard per comunicare e passarsi i dati, esattamente come si è definito uno standard per la forma dei dati, ossia JSON od XML. 

Visto che tanto si sa che i dati avranno uno delle due forme, si è deciso di creare un tipo com "IActionResult" che non mostrasse (soltanto e soprattuto) la vera forma di trasmissione dei dati (JSON od XML) ma più che altro dicesse qual'è il" risultato dell'azione".

Ossia se l'API ha restituito i dati, è entrato nel DB ma non li ha trovati, oppure il DB ha bloccato l'accesso od altro...

In ogni caso, si può usare i generics (ActionResult<T>)) per per precisare il tipo di risposta di un endpoint, in questo modo:

`public ActionResult<string> endpointName(){...}` 