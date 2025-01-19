
# CARTELLA SERVICES

I file in service contengono la logica dell'applicazione ossia manipolano i dati.

La forma che hanno i dati è definita nei file della cartella models.

---

# CLASSE ObjectiveService

Gli obiettivi sono racchiusi in un array di Obiettivi:

```private objectivesList: Objective[] = [];```

Tale lista cambia nel tempo perché si possono aggiungere nuovi obiettivi, modificare quelli esistenti od eliminarne.

Per gestire ogni casistica con tutti i loro dettagli e controlli, ci son una serie di metodi.

La cosa da attenzionare ora è il meccanismo che permette al resto dell'applicazione di sapere quando la lista cambia, come cambia e che azioni eseguire una volta che il cambiamento è avvenuto. Tutto ciò viene gestito con gli observable.

## Gli Observable ed observer nella classe ObjectiveService

Observable = oggetto che controlla se c'è un cambiamento in un altro oggetto. Nel nostro caso, la lista di obiettivi.

Infatti l'observable è definito così:

```private objectivesSubject: BehaviorSubject<Objective[]> = new BehaviorSubject<Objective[]>([]);```

BehaviorSubject è un tipo speciale di Subject. Un Subject è sia Observable che Observer contemporaneamente. Ma, per questa spiegazione, facciamo finta che sia un semplice Observable.

<Objective[]> indica il tipo di dati che BehaviorSubject manipolerà. Ossia, come detto, l'elenco degli obiettivi.

= new BehaviorSubject<Objective[]>([]); indica invece che l'oggetto objectivesSubject, di tipo  BehaviorSubject<Objective[]> è una nuova istanza di BehaviorSubject<Objective[]>, che viene valorizzata con ([]) ossia un array vuoto.

Al di la del tecnicismo, quel che conta è che viene creato un nuovo "Observable" che manipola Objective[] e che all'inizio è vuoto.

Come riempire o modificare questo Observable lo decido io nella logica dei vari metodi che, a prescidede dallo scopo, tutti manipoleranno la nostra lista di obiettivi ossia il membro della classe objectivesList. Una volta fatte le manipolazioni necessarie, bisogna passarlo all'observable in modo che esso sia aggiornato rispetto allo stato dei dati che deve controllare. Per aggiornarlo, si usa un comando: Next(). Per esempio:

```this.objectivesSubject.next(this.objectivesList)```

Finora non abbiamo fatto nulla di che: solo riempito un oggetto con nuovi valori. Ma la magia viene ora: per logiche interne che a noi non interessano, in automatico quando viene chiamato il metodo next() su un Observable come nel metodo precedente, viene chiamata un'altra funzione. Tale funzione rappresenta il modo in cui noi vogliamo che la nostra applicazione reagisca al cambiamento dei dati!

Ora noi abbiamo un meccanismo che permette di far fare al programma ciò che vogliamo senza doverlo comandare in modo diretto perché ci pensa l'observer, in automatico, a dare quel comando. E lo da al cambiamento dei dati che sta manipolando o "osservando".

Ma dove sono contentuti i comandi da eseguire? Chi li esegue? La risposta è l'observer, il quale assomiglierà a qualcosa tipo: 

```
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
```
Noi stiamo qui creando una variabile chiamata observer, di tipo Observer, che manipola dati di tipo Objective[], ossia la nostra lista di obiettivi. 

I comdandi che l'observable fa eseguire all'observer quando viene modificato con successo sono quelli dopo "next:". Quando nella modifica sorge un errore viene fatto scattare quanto definito dopo "error:" e quando invece si vuole dire all'observer di eseguire X ma che poi non è più necessario che reagisca ai cambiamenti monitorati all'observer, si usa complete.

Per attivare tutto questo meccanismo, è necessario usare il metodo subscribe():

```
SubscribeObserver(observer: Observer<Objective[]>) {
    this.objectivesSubject.subscribe(observer);
}
```
In questo modo, nel momento in cui l'Observer chiemerà il metodo next(), tutti gli Observer che risulteranno "iscritti" a quel dato Observer faranno scattare il loro metodo next().

Per interrompere questo meccanismo, si fa la stessa cosa ma col metodo Unsubscribe().

###Riassunto ed esempio pratico

1. Abbiamo un oggetto di cui vogliamo monitorare i cambiamenti di valore e, al loro cambiamento, vogliamo che in automatico vengano svolte delle azioni. 
Nel nostro caso: ```objectivesList: Objective[] objectivesList: Objective[]```

2. Per cambiare i dati si avranno dei metodi normalissimi. 
Nel nostro caso: ```objectivesSubject: BehaviorSubject<Objective[]>```

3. Per monitorare lo stato dell'oggetto e, al suo cambiamento, far eseguire delle azioni si userà un Observable pasandogli l'oggetto che deve monitorare (dopo che è stato manipolato da un certo metodo) ed invocando il suo metodo next().
In questo modo: ```this.objectivesSubject.next(this.objectivesList)```

4. Per eseguire le azioni che vogliamo, si useranno tutti quegli Observer che, al comando scritto nella riga sopra, risulteranno subscribed() all'observable. Per interrompere il meccanismo, si userà unsubscribe(). Le azioni eseguite, saranno quelle dopo il comando "next:". Nel nostro esempio, il valore passato dall'Observer viene preso semplicemente stampato a console.

In questo modo:
```
const subscription = observable.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Observable completed'),
});

setTimeout(() => subscription.unsubscribe(), 5000);
```

Un esempio pratico di utilizzo può essere questo: 

- C'è una grigila con la lista degli obiettivi. 
- L'utente aggiunge un nuovo obiettivo compilando un popup.
- La griglia verrà riempita in automatico. 

L'Observer osserva i cambiamenti dell'oggetto che contiene la lista degli obiettivi. 
Quando essa cambia dopo la compilazione del popup, per il quale ci sarà un determinato metodo, viene avvisato un Observer che si occuperò di aggiornare la griglia, mostrando anche il nuovo obiettivo.
