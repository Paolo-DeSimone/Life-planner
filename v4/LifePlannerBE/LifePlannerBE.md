# Architettura tipica di un progetto ASP.NET Core Web API

ASP.NET Core è un framework di Microsoft che permette di fare molte cose.

Una tra queste è creare un sistema progettato per gestire le API.

Il sistema in questione è chiamato "progetto web api"

## Struttura dei file predefinita

La struttura dei file predefinita è questa:

LifePlannerBE/
├── Controllers/
│   ├── UserController.cs
├── Models/
│   ├── UserModel.cs
├── Services/ (Opzionali)
│   ├── UserService.cs
├── Program.cs
├── appsettings.json
├── appsettings.Development.json
├── LifePlannerBE.csproj

Maggiori dettagli su ogni file sotto.

## Gestione richieste HTTP ed HTTPS tramite una "pipeline"

Degli esempi di richieste sono qualcosa tipo:

`GET http://localhost:4200/api/users`  
`POST http://localhost:4200/api/users`  
`PUT http://localhost:4200/api/users/{id}`  
`DELETE http://localhost:4200/api/users/{id}`  

La pipeline è la serie di operazioni a cui una richiesta deve sottoporsi prima di poter ritornare una risposta al client. Queste operazioni vengono fatte tramite la chiamata di metodi, resi disponibili dal framework, tipo:

- `UseRouting()`: Instrada la richiesta al controller appropriato (es. `UserController`).
- `UseAuthentication()`: Controlla l'identità dell'utente (se richiesto).
- `UseHttpsRedirection()`: Prende le richieste, anche se in HTTP, e le trasforma in HTTPS.

Ogni metodo rappresenta un middleware, ossia una funzione che esegue un'operazione specifica sulla richiesta. L'ordine in cui sono chiamati nel file `Program.cs` è importante, perché la richiesta passa attraverso di essi in sequenza.

## I Controller nel dettaglio

I controller gestiscono le richieste HTTP. 

Per come Microsoft ha progettato questa app, ogni controller deriva da una classe tipo ControllerBase (o Controller, se è un'app MVC). 

Ecco un esempio coi relativi commenti:

`
using Microsoft.AspNetCore.Mvc;
using Models; // namespace personalizzato che mette a disposizione i suoi oggetti grazie al sistema di DI (Dipendency Injection)

[Route("api/[controller]")] // ASP.NET Core sostituisce [controller] con il nome della classe senza il suffisso "Controller".
[ApiController] // Indica che la classe è un controller ed esegue gli "attributi di annotazione", ritornando 404 se falliscono.
public class UserController : ControllerBase
{
    [HttpGet("getall")] // Indica che questo endpoint risponde a richieste di tipo GET
    public IActionResult GetAll()
    {
        // Logica per restituire i dati
        return Ok(users);
    }
}
`
### Cosa fornisce Microsoft.AspNetCore.Mvc;

Questo namespace contiene le classi, gli attributi, e i metodi necessari per la gestione delle richieste HTTP, la validazione dei dati, e l'implementazione delle risposte per i client. 

Le principali funzionalità che fornisce sono:

- Routing: Permette di associare URL specifici a metodi di un controller (ad esempio, Route("api/[controller]")).

- Attributi di Action: Fornisce attributi come [HttpGet], [HttpPost], [HttpPut], [HttpDelete], ecc., per indicare quale tipo di richiesta HTTP un metodo deve gestire.

- Validazione: Include supporto per la validazione automatica dei dati, come i vincoli su un modello (ad esempio, [Required], [StringLength]), che vengono applicati quando i dati vengono inviati al controller.

- Result di azioni: Fornisce classi per la gestione delle risposte HTTP, come ActionResult, OkObjectResult, BadRequestResult, e NotFoundResult, per restituire facilmente risposte standardizzate dal controller.

### Cosa fornisce ControllerBase

La classe ControllerBase è la base per i controller in un'applicazione Web API. Quando crei un controller derivato da ControllerBase, ottieni una serie di funzionalità utili per gestire le richieste HTTP in modo efficiente e standardizzato. 

Le principali funzionalità di ControllerBase sono:

La classe fornisce metodi per restituire i risultati delle azioni, ossia delle chiamate. Ad esempio:

- Ok(): Restituisce una risposta HTTP 200 (OK) con il corpo della risposta.

- BadRequest(): Restituisce una risposta HTTP 400 (Bad Request).

- NotFound(): Restituisce una risposta HTTP 404 (Not Found).

- Created(): Restituisce una risposta HTTP 201 (Created) con l'URL dell'elemento creato.

- Unauthorized(): Restituisce una risposta HTTP 401 (Unauthorized).

- Proprietà "Request" e "HttpContext": utili per accedere al contesto della richiesta (ad esempio, query string, intestazioni)

- Gestione degli errori: Offre metodi per gestire le eccezioni e gli errori in modo centralizzato, utilizzando middleware o filtri, per restituire risposte appropriate in caso di errori.

- Convenzioni di Response: Offre metodi per semplificare la restituzione di risposte formattate correttamente, come oggetti JSON o XML.

- Supporto per la Serializzazione: Poiché la maggior parte delle API restituirà dati in formato JSON (o XML), ControllerBase include il supporto per la serializzazione automatica di oggetti C# in JSON tramite il framework di serializzazione predefinito.

- Funzionalità di Auto-binding per i parametri: I parametri che vengono passati a un metodo del controller vengono automaticamente collegati dai dati inviati nella richiesta (ad esempio, il corpo della richiesta o i parametri di query).

#### Differenza tra ControllerBase e Controller

ControllerBase è progettato per le Web API e fornisce solo le funzionalità necessarie per gestire le richieste e risposte HTTP.

Controller, che deriva anch'esso da ControllerBase, è usato principalmente nelle applicazioni MVC (Model-View-Controller), ed include anche funzionalità per il rendering delle viste (quindi supporta il lavoro con pagine HTML, con Razon, ad esempio). Se non si gestiscono viste, non serve userlo.

## I Models nel dettaglio

I modelli rappresentano i dati dell'applicazione. Sono semplici classi C# che possono includere:

- Proprietà per i dati.
- Validazioni tramite annotazioni.
- Logica leggera, come metodi di calcolo.

Esempio:

`
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class UserModel
    {
        [Required]
        public string Name { get; set; }

        [Range(0, 120)]
        public int Age { get; set; }
    }
}
`

Ci sono alcune convenzioni: come nominare i campi readonly con un underscore iniziale.

### Attributi di annotazione o "annotazioni"

I membri possono usarli per aggiungere dei controlli aggiuntivi. Degli esempi sono [Required]. [Range] o [EmailAddress], che valida il formato dell'indirizzo mail.

Si possono creare annotazioni proprie, in quanto non sono altro che metodi che poi si scrivono tra parentesi quadre. 

Ecco un esempio:

Creazione:
`
public class CustomEmailValidationAttribute : ValidationAttribute
{
    private readonly string _domain;

    public CustomEmailValidationAttribute(string domain)
    {
        _domain = domain;
    }

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is string email && email.EndsWith($"@{_domain}"))
        {
            return ValidationResult.Success; // Valido
        }

        return new ValidationResult($"Email must end with '@{_domain}'");
    }
}
`

Uso nel modello:

`
public class UserDto
{
    [Required]
    public string Name { get; set; }

    [CustomEmailValidation("tuodominio.com")]
    public string Email { get; set; }
}

`
Se l'email fornita non termina con @tuodominio.com, il framework restituirà automaticamente un 400 Bad Request.

## La Dependency Injection (DI) di ASP.NET Core

ASP.NET Core fornisce un contenitore di DI che è configurato nel file Program.cs o Startup.cs. 

Quando un controller o un altro componente richiede una dipendenza, il framework la fornisce automaticamente tramite il costruttore.

Esempio di configurazione della DI in Program.cs:

`
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // Registrazione di un servizio nel container di DI
        services.AddScoped<IUserService, UserService>();
    }
}
`

In questo caso, il servizio UserService viene registrato per essere utilizzato ogni volta che un controller o altro componente richiede un'istanza di IUserService

`
using Microsoft.AspNetCore.Mvc;

public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    // Il costruttore del controller riceve la dipendenza IUserService
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        var users = _userService.GetUsers(); // Usare il servizio iniettato
        return Ok(users);
    }
}
`

In questo esempio, IUserService è iniettato nel costruttore del controller. ASP.NET Core gestisce l'istanza di IUserService e la fornisce automaticamente al controller, gestendone anche la distruzione.

Ogni injection può avere un tipo di ciclo di vita differente a seconda dei casi:

- Transient: Crea una nuova istanza ogni volta. 
`services.AddTransient<IHelperService, HelperService>();`

- Scoped: Una nuova istanza per ogni richiesta HTTP.
`services.AddScoped<IUserService, UserService>();`

- Singleton: Una sola istanza per l'intera durata dell'applicazione. 
`services.AddSingleton<IConfigService, ConfigService>();`

## Altre convenzioni, chiarimenti e standard definiti da Microsoft

### Uso dei DTO (Data Transfer Object)

I DTO vengono utilizzati principalmente per separare i "modelli di dominio", cioè i "models" di cui abbiamo parlato sopra che rappresentano le entità cioè le tabelle del DB, dalle risposte HTTP, che invece conterranno i veri e propri dati, aventi un determintato tipo, per esempio il tipo UserDTO.

Restituire un DTO rispetto al model, per ciò avere qualcosa tipo:

`
[HttpGet("{id}")]
public ActionResult<ProductDTO> GetProduct(int id)
{
...
}
`
al posto di

`
[HttpGet("{id}")]
public ActionResult<Product> GetProduct(int id)
{
...
}
`

garantisce: 

- Sicurezza e Controllo: si espone solo quel che serve. Infatti è possibile usare più DTO, includendo più o meno informazioni.

- Decoupling: significa "disaccoppiare" ed è un principio in base al quale si struttura tutto per far si che se una cosa cambia (codice o database) il resto dell'applicazione continua a funzionare. Riferendomi all'esempio sopra, nel caso del DTO il model Product può aggiungere dei campi o anche togliergli e l'API, se non si toccano i campi su cui si regge il DTO, continuerà a funzionare ed a farlo come prima.


### Principi RESTful per la costruzione di API

Microsoft raccomanda di seguire i principi REST (Representational State Transfer) quando costruisci un'API.

Ciò significa che dovresti strutturare le tue API in modo che rispecchino operazioni CRUD (Create, Read, Update, Delete) tramite HTTP verbs (POST, GET, PUT, DELETE).

Nota: Evita di usare verbi nell'URL (getUsers), perché non è conforme allo stile RESTful.

Meglio qualcosa tipo:

`PUT http://localhost:4200/api/users/{id}`  

### Uso di ActionResult<T> nei controller: 

In un progetto ASP.NET Core Web API, invece di restituire un tipo diretto come IActionResult, Microsoft consiglia di restituire ActionResult<T>, dove T è il tipo della risposta, per consentire una gestione migliore delle risposte HTTP e dei codici di stato. Ad esempio:

`
[HttpGet("{id}")]
public ActionResult<ProductDTO> GetProduct(int id)
{
    var product = _productService.GetProductById(id);
    if (product == null)
    {
        return NotFound();
    }
    return Ok(_mapper.Map<ProductDTO>(product));
}
`

### Versionamento delle API

Microsoft consiglia l'uso di un sistema di versionamento delle API per garantire che la loro evoluzione non interrompa la compatibilità con i client esistenti. Il versionamento può essere fatto via:

- route: /api/v1/products
- header: Utilizzando l'intestazione Accept per specificare la versione, come ad esempio Accept: application/vnd.myapi.v1+json.
- query string: /api/products?version=1.

### Swagger/OpenAPI

Microsoft promuove l'uso di Swagger per la documentazione automatica delle API. 

Con Swashbuckle, una libreria di terze parti, è possibile generare la documentazione OpenAPI direttamente dal codice, senza bisogno di scrivere documentazione separata. 

Questo è utile per i team di sviluppo e i consumatori delle API, che possono interagire direttamente con l'API attraverso una UI interattiva.

### AutoMapper

Questa è una libreria per mappare i dati tra le entità di dominio e i DTO.

Mappare significa collegare i membri di un oggetto ai membri di un altro.

Esempio d'uso:

`var productDTO = _mapper.Map<UserDto>(user);`

Questo comando mappa automaticamente un oggetto di tipo User a un oggetto di tipo UserDto, il quale non per forza deve avere tutti i campi di User!

Nota: il membro mappato NON "eredita" anche le annotazioni. Nel nostro esempio, è necessario definirle direttamente in UserDto. Inoltre i nomi tra i due oggetti dovrebbero essere uguali. Se non lo sono, una mappatura manuale sarà necessaria.


### ORM: Entity framework

Microsoft incoraggia l'uso dell'ORM "Entity Framework" ossia una tecnologia in grado di creare delle classi rappresentati le tabelle del DB, come i models, ma con in più tutta una serie di funzionalità che permettono di interagire col database, come LINQ.

#### Confronto con models "creati a mano", cioè senza ORM

Senza un ORM, si dovrebbe lavorare solo di SQL per estrarre i dati dal DB, possibilemente racchiudendole in stored procedure e chiamandole in BE, evitando così query hard coded in BE, col rischio di SQL Injection.

Ciò ha dei vantaggi, il principale son le performance migliori. 

Tuttavia ci sono altri svantaggi, tra cui la mantenibilità e la scalabilità durante lo sviluppo. Per esempio diventa problematico gestire il versioning delle API se la logica è tutta in DB. Così come lo è il debug, in quanto l'IDE ha strumenti migliori.

L'approccio migliore è forse usare entrambe le cose: stored procedure per elaborazioni complesse, tipo report, e ORM per le operazioni CRUD.


### Filosofia "Stateless": 

ASP.NET Core Web API segue la filosofia stateless. 

Ogni richiesta HTTP è completamente indipendente dalle altre e non conserva lo stato tra le richieste. 

L'autenticazione e la gestione dello stato dell'applicazione (se necessario) avvengono tramite meccanismi come i token JWT, senza memorizzare sessioni lato server.


### Differenza tra .NET Framework, .NET Core e ASP.NET.

.NET Framework (o solo ".NET") è una piattaforma di sviluppo per applicazioni (desktop, web, mobile, cloud) fornita da Microsoft.

.NET Core è la versione moderna e multipiattaforma di .NET.

ASP.NET è parte di .NET e .NET Core dedicata alla creazione di applicazioni web ed API. Se la chiamo "ASP.NET. framework" faccio riferimento alla sua versione più vecchia, viceversa se la chiamo "ASP.NET. Core"

