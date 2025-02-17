# Descrizione progetto

LifePlanner è un programma in cui si definiscono obiettivi, tipo comprare casa, e se ne monitora il raggiungimento, rispondendo a domande come:

- Quanti soldi destino ai miei obiettivi? 
- Cosa succede se non posso più risparmiare quanto preventivato? 
- Come influisce sulla mia pianificazione un eventuale perdita o guadagno di denaro improvvisa?

Viene inoltre monitorato il come spendiamo i soldi extra, ossia quelli non destinati al risparmio/investimento per raggiungere gli obiettivi di medio-lungo periodo.  

Questo allo scopo di miglioramento personale: esser consapevoli e padroni delle proprie spese, è una abitudine sana.  

Infine verranno prodotti report per aiutare nel monitoraggio e nell'autoanalisi.

Una versione dettagliata ma abbastanza sintetica della logica del programma è contenuta in "Life-planner/v5". Di seguito un vocabolario per interpretare i termini usati nei diagrammi.

# Avviare la v5

Da v5/v5Configs scrivere in console

`npm run start-all`

per avviare FE e BE contemporaneamente.


# Vocabolario 

TMI = Total Montly Income = I soldi che guadagni o prevedi di guadagnare in 1 mese. Es: stipendio. 

OMB = Objective Montly Budget = La parte del TMI destinata al raggiungimento degli obiettivi. 

EMB = Expances Montly Budget = La parte del TMI destinata alle spese mensili. 

OBJs = Objectives, gli obiettivi che ci fissiamo. 

OBJexp = OBJ expiry ossia quando si prevede di raggiungere l’obiettivo. 

XXXperc = si riferisce alla percentuale di uno dei vocaboli elencati.  

XXXtot = si riferisce al totale in termini assoluti di uno dei vocaboli elencati. 

OMBass = OMB assegnato. Cioè la quota parte dell’OMBtot che è assegnata ad un obiettivo. 

OMBleft = OMB left cioè rimanente. Cioè l’OMBtot - tutti gli OMBass. 

OMBsaved = la somma di soldi che di fatto viene risparmiata per un singolo obiettivo. 

OMBtarget = La somma da raggiungere per dichiarare raggiunto l’obiettivo.

Emergency fund = fondo di emergenza. Un saldo che può esser positivo se l'utente ha un credito o negativo se ha un debito. Qui ci vanno tutti i soldi che non son tracciati e che quindi escono dalla logica TMI = OMB + EMB. Esempi: soldi ricevuti in regalo od un intervento medico inaspettato.

# Perché è nato

Avevo già un life planner su Google Sheets ma volevo qualcosa di più personalizzabile e comunque dovevo imparare a programmare.

Ragion per cui, questa repository ha una cartella con le vecchie versioni del programma, tramite le quali si vede la proggressione dal semplice JS, al TS, all'uso di framework come Angular e la creazione di un BE con relativo DB.

Notasi che questo programma è pensato per la gestione di obiettivi di medio-lungo periodo. Per "obiettivi" raggiungibli in meno di un mese, ci son già tool come Google Calendar.

# Problemi con l'intellisense? Stai programmando ma l'IDE non rileva gli errori? 

Probabilmente perché ci sono più progetti all'interno della stessa cartella.
Il file .vscode con la relativa impostazione serve proprio a dire quale soluzione dovrebbe ricevere il supporto dell'IDE.
