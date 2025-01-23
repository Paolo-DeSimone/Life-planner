# Struttura del progetto

Dentro la cartella BE è stato creato un progetto "ASP.NET Core Web API" che è ciò con cui tipicamente si creano API.

Partendo dal basso dei file visibili nella cartella BE dentro "l'esplora risorse" di VS Code, ed al 15.01.25, abbiamo i seguenti file:

## Program.cs

Qui si configura ed avvia l'app.

### Configurazione

Dopo la creazione di un oggetto "builder" si può configurare una serie di cose:

- *Servizi*: oggetti che rendono disponibile funzionalità utili all'app.

    `builder.Services.AddControllers();`

Questa riga aggiunge i controller come servizio, che sono responsabili di gestire le richieste HTTP e generare risposte. La registrazione dei servizi utilizza il meccanismo chiamato Dependency Injection (DI), maggiori approfondimenti sotto.

- *Web Server*: Il server predefinito per un progetto ASP.NET Core è Kestrel, che riceve richieste HTTP o HTTPS e restituisce risposte come JSON o HTML. Maggiori dettagli sono forniti nella sezione dedicata.

- *Middleware*: Software che processano e trasformano le richieste HTTP in ingresso e uscita. Esempi comuni includono middleware per fare il reindirizzamento HTTPS, per l'autorizzazione, gestione degli errori, ecc. Esempi:

    `
    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.MapControllers();
    `

### Creazione ed avvio

Dopo aver configurato i servizi, viene creata l'applicazione:

 `
var app = builder.Build();
 `

Infine, si avvia l'applicazione con:

 `
app.Run();
 `

Nota: l'applicazione, così come il framework .NET e la pipeline di middleware, fanno parte del così detto "runtime dell'applicazione" ossia tutto l'insieme di cose che servono per far funzionare l'applicazione.

### Il Kestrel

Il Web Server predefinito di ASP.NET Core.

Si distingue per esser leggero, ad alte prestazioni, Multipiattaforma (Windows, macOS, Linux) ed in grado di servire contenuti sia statici(HTML,CSS ed immagini) che dinamici (le risposte del BE). Può essere usato in 2 modi:

- Standalone: gestisce le richieste HTTP senza intermediari. Utile per app interne, per tenere le cose più semplici o per avere performance migliori.
    
- Dietro un reverse proxy: Un server intermedio tra Client e Web server. Il suo scopo è aggiungere funzionalità come caching per migliorare le performance o bilanciamento del carico, gestione dei certificati SSL/TLS o terminazione SSL/TLS centralizzata. 

Degli esempi sono IIS che gestisce le richieste fatte da una macchina con sistema operativo Windows, Apache per Apple/Linux o Nginx per Linux. Se si usa VS o VS Code, IIS è usato di default ed impostato come reverse proxy in launchSettings.

In ogni caso, funziona ascoltando richieste HTTP ed HTTPS tramite le porte (approfondimento sotto) configurate in launchSettings.json e Program.cs come di seguito riportato 

`
"profiles": {
    "http": {...}
    },
    "https": {...}
}

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000); // Porta HTTP
    options.ListenAnyIP(5001, listenOptions => listenOptions.UseHttps()); // Porta HTTPS
});
`

Una volta ricevute, le passa alla pipeline di middleware e ritorna una risposta al client.

## BE.https

definisce richieste HTTP da inviare al server durante lo sviluppo o il testing. È utile per testare endpoint API senza utilizzare strumenti esterni come Postman o browser.

Facendo riferimento al codice:

- `@BE_HostAddress`: Definisce una variabile per l'URL del server. In questo caso, è configurato per un'app in esecuzione in locale sulla porta 5001.

- `GET {{BE_HostAddress}}/weatherforecast/`: Una richiesta GET per ottenere dati dall'endpoint /weatherforecast.

- `###` : separa diverse richieste HTTP nel file. Serve per indicare a tool come l'estensione "REST Client", in Visual Studio Code, che il blocco successivo è una nuova richiesta e che può rispondere in qualunque modo, sia JSON che XML.

Nota: è possibile anche obbligare il server che ci risponde ad inviarci solo JSON con il compando: `Accept: application/json`

## BE.csproj

È il file di configurazione del progetto .NET che specifica le dipendenze, le versioni di framework e altre impostazioni necessarie per compilare ed eseguire l'applicazione.

Tra i vari comandi presenti, è bene far notare `<PackageReference>`, che specifica in sintesi le dipendenze NuGet necessarie, un pò come `package.json` per TS, creando quindi il file `obj/project.assets.json`, che invece contiene tutte le dipendenze con le versioni esatte, e le dipendenze delle dipendenze, proseguendo fino alla fine della catena, corrispondendo quindi al`package.lock.json` di TS. Approfondimenti su NuGet sotto.








## appsettings.json

È il file di configurazione principale per ASP.NET Core. Contiene impostazioni che possono essere lette dall'applicazione durante l'esecuzione. 

è utile per centralizzare le configurazioni che possono variare tra gli ambienti (ad esempio, sviluppo e produzione).

## appsettings.Development.json

È una variante di appsettings.json caricato automaticamente solo in ambiente di sviluppo. Quanto contenuto estende o sovrascive quanto in `appsettings.json`.

Nota: potrebbe esistere anche un file solo per l'ambiente di produzione, qualcosa tipo `appsettings.Production.json`

## Properties\launchSettings.json

Definisce gli ambienti e le configurazioni per il debug. 

Io ho 2 ambienti: Development e Production. 

Avere più ambienti è utile perché potresti voler eseguire il programma con configurazioni diverse per questioni di comodità. 
Ad esempio, in Development, potresti voler abilitare più log dettagliati o l'uso di strumenti di debug come Swagger. 
In Production, invece, puoi abilitare solo i log di errori e usare certificati HTTPS reali. 

Per decidere con che ambiente avviare il BE, usare i comandi:

`dotnet run --environment "Development"`
`dotnet run --environment "Production"`


Contiene configurazioni per avviare il server con diversi profili (ad esempio, per IIS Express o Kestrel).

Nel mio caso, IIS agisce come "reverse proxy" (spiegazione sotto) per poi passare le chiamate ricevute al Kestrel.



## Cartella obj

- Descrizione: Directory principale per i file intermedi e temporanei generati durante la build del progetto.

- Scopo: Usata dal sistema di build per archiviare file di output non finali e supportare il processo di compilazione. Questa cartella può essere rigenerata in qualsiasi momento eliminandola e ricostruendo il progetto


### obj\project.nuget.cache

- Descrizione: File di cache relativo ai pacchetti NuGet.

- Scopo: Memorizza informazioni sui pacchetti NuGet necessari per il progetto e la loro risoluzione. Questo file velocizza il ripristino dei pacchetti (restore) nelle build successive.

### obj\project.assets.json

- Descrizione: File JSON che descrive le dipendenze del progetto e i relativi riferimenti risolti.

- Scopo: Contiene i dettagli di tutte le librerie NuGet, le loro versioni e le dipendenze transitive usate nel progetto. È essenziale per garantire che tutte le dipendenze siano correttamente risolte e caricate.


### obj\BE.csproj.nuget.g.targets

- Descrizione: File .targets generato automaticamente per configurare le attività di build specifiche per le dipendenze NuGet.

- Scopo: Definisce i passaggi di build necessari per integrare i pacchetti NuGet e le relative dipendenze nel progetto.

### obj\BE.csproj.nuget.g.props

- Descrizione: File .props generato automaticamente che contiene proprietà globali legate ai pacchetti NuGet.

- Scopo: Configura proprietà specifiche per i pacchetti NuGet utilizzati dal progetto e consente l'integrazione fluida con il sistema di build

### obj\BE.csproj.nuget.dgspec.json

- Descrizione: Specifica dettagliata delle dipendenze NuGet e della risoluzione delle dipendenze.

- Scopo: Usato da NuGet per rappresentare il grafo di dipendenze del progetto. Serve per diagnosticare problemi relativi alla risoluzione delle dipendenze.

### obj\Debug\net8.0

- Descrizione: Cartella specifica per i file di build relativi alla configurazione Debug e al framework .NET 8.0.
Contenuto:

- Scopo: Organizza i file intermedi e gli oggetti compilati per una build di debug. Questo ambiente di build include simboli di debug per facilitare il troubleshooting e il testing.


## Cartella bin


Contiene il risultato della compilazione del tuo progetto. Quindi contiene:

- File eseguiti (ad esempio .exe o .dll) ossia sono i file compilati, ovvero il codice macchina che può essere eseguito dal computer, creato dopo che il compilatore ha letto il codice che ho scritto in un dato linguaggio di programmazione.

- File di debug (come .pdb), che servono per fare il debug durante lo sviluppo.

- File di dipendenza ossia i file legati alle librerie o ai pacchetti NuGet utilizzati nel progetto

La cartella viene aggiornata solo se ci sono modifiche nel codice rispetto all'ultima esecuzione del comando `dotnet run`.  

Se non ci sono cambiamenti nel codice, i file di output vengono riutilizzati senza ricompilare tutto da zero.



---



# Approfondimenti

Nozioni utili più generali per capire quanto strettamente legato a questa applicazione, descritto sopra.

## Il sistema di DI (Dipendency Injection)

 La DI è un design pattern che separa la logica dell'applicazione (ciò che il programma deve fare) dalla creazione e gestione degli oggetti di cui ha bisogno per funzionare, detti "dipendenze". 

Tutta la loro gestione è automatizzata, permettendo di sviluppare più facilmente.

### Differenza tra dipendencies injection e l'importazione di namespace con la keyword "using"

Sebbene comandi come

`using Microsoft.AspNetCore.Mvc;`

siano di fatto delle "dipendenze", perché mi servono per implementare la logica della mia app, non sono ufficialmente definite come tali. 

Questo perché non si crea né gestisce in alcun modo qualcosa. 

Si da solamente la *possibilità* di accedere a quanto definito nel namespace importato e quindi di usarlo. Tutto però avviene in maniera manuale. Si parla quindi si semplici "importazioni" 

## Differenza tra HTTP, HTTPS e certificati SSL/TLS

### HTTP (Hypertext Transfer Protocol):

- Non è sicuro: i dati viaggiano in chiaro (non crittografati).
- Qualsiasi intermediario (es. un hacker in una rete non protetta) può intercettare le comunicazioni fingendosi il server destinatario, ad esempio.

### HTTPS (HTTP Secure):

In più rispetto ad HTTP c'è il certificato SSL/TLS. Funziona così:

- Il client si connette al server tramite HTTPS.

- Il server invia il suo certificato SSL/TLS al client per dimostrare di essere il server giusto.

- Il client verifica che il certificato sia valido (emesso da una CA, non scaduto, ecc.).

- Viene stabilita una connessione crittografata grazie al protocollo TLS (Transport Layer Security), effettuando quindi la così detta "handshake TLS".

Una metafora per capire i 2 protocolli, è quella di un corriere Amazon che consegna un pacco:

- Con HTTP Il corriere (client) controlla se il citofono (server) ha il nome corretto (dominio/url). Se lo trova giusto, consegna il pacco (dati).

- Con HTTPS, aggiungiamo un livello di sicurezza: il corriere DEVE chiedere un documento (il certificato) per garantire che il destinatario sia esattamente chi dice di essere.

Kestrel supporta sia HTTP che HTTPS. Per configurarne il certificato, si fa così:
 `options.ListenAnyIP(5001, listenOptions => listenOptions.UseHttps("path/to/certificate.pfx", "password"));`

#### Nota: HTTPS e "mutual TLS" o "mTLS"

HTTPS può funzionare anche in "mutual TLS" o "mTLS" cioè con una autenticazione reciproca. Quindi anche il client deve avere un certificato per dimostrare l'identità. Alcuni casi in cui torna utile sono:

- Applicazioni aziendali: Un client accede a un server aziendale e, così come il server deve dimostrare di esser quello giusto, il client deve dimostrare di aver diritto ad accedervi.

- Banche od API particolari.

In sostituzione del mTLS, in contesti di ordinaria navigazione web, come accedere a un sito come Facebook, si usano USR e PWD, Token di sessione oppure 2FA perché son più semplici da usare per utenti comuni rispetto ad un certificato.

##### Caso particolare: "mutual TLS" quando si sviluppa in locale

Sviluppare in locale significa che il proprio pc è *contemporaneamente* sia client (quando faccio richieste con browser o Postman) che server, se ovviamente esiste un Back-End. 

Di defualt il client NON si fida di server che non hanno un certificato valido. Ed il proprio pc, essendo tale, non è un server e quindi non disponde di un certificato valido. Dunque bisogna dire al pc-client esplicitamente di "fidarsi" del pc-server a cui sta facendo la richiesta.

In questo programma ho usato il seguente comando, che non solo genera il certificato di sviluppo, ma lo registra come affidabile nel sistema operativo:

`dotnet dev-certs https --trust`

### Certificati SSL/TLS

Fanno 2 cose:

- Permettono al client di sapere che si sta comunicando col server giusto.

- Proteggono i dati delle richieste HTTPS crittografandoli.

E son di 2 tipi:

- Self-signed: Creati manualmente. Validano solo per uso locale o test.

- CA-issued o "Certification Authority" issued: Emessi da un'autorità riconosciuta. Usati per siti pubblici.


Entrambi contengono:

- Chiave pubblica: Per crittografare i dati.
- Nome del dominio: Indica per quale dominio è valido il certificato.
- Autorità di certificazione (CA): Chi ha emesso il certificato (es. Let's Encrypt, DigiCert).
- Periodo di validità: Le date di inizio e fine validità.

## Cosa sono le "porte"? Tipo 5000 o 5001.

Le porte sono punti di comunicazione virtuali usati per identificare servizi specifici su un computer.

Un indirizzo IP identifica un dispositivo sulla rete. Una porta identifica un'applicazione o servizio specifico sul dispositivo.

Ad esempio:

Porta 80: Usata per HTTP.
Porta 443: Usata per HTTPS.

In Kestrel, puoi configurare su quali porte il server deve ascoltare:

`
options.ListenAnyIP(5000); // HTTP
options.ListenAnyIP(5001, listenOptions => listenOptions.UseHttps());
`

## Cos'è NuGet

NuGet è un gestore di pacchetti creato nel 2010 ed oggi è parte integrante dell’ecosistema .NET.

In maniera simile ad "npm" per JavaScript. Ti consente di cercare, scaricare, installare e gestire librerie di terze parti.