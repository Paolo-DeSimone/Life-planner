# Descrizione progetto ed obiettivi

Il life planner è un progetto nato per la necessità di monitorare i miei obiettivi di vita (comprare casa, migliorare fisicamente...) gestendo il normale ciclo di vita di un obiettivo, ma anche eventuali imprevisti.

Un dato obiettivo sarà raggiunto cercando di manipolare e gestire i 3 aspetti che accomunano un qualsiasi obiettivo: 

- il cosa: "Voglio comprare casa"
- il quando: "Nel 2030"
- il come: "E per farlo mi serve risparmiare X euro al mese per N anni"

In particolare, questa ultima variabile, "il come", sarà oggetto di manipolazione all'interno del programma. 

La logica per gestire "il come", in parole povere, è questa: 

TMI = OMB + EMB

- TMI = Total Montly Income: "guadagno 1000 euro al mese"
- OMB = Objectives Monlty Budget: "del TMI destino il 70% al risparmio al fine di realizzare i miei obiettivi"
- EMB = Expances Monlty Budget: "I soldi che restano DOPO aver definito l'OMB, posso spenderli come voglio"

Non è complicata come logica, ma ci son alcune cose da gestire:

- Come pianifico degli obiettivi se, quando inizio ad usare il life planner, NON ho un lavoro?
- Nel momento in cui lo trovo, come gestisco le differenze tra ciò che ho stimato in termini di TMI ed il reale incasso che ora ho?
- Come gestisco i miei obiettivi se all'improvviso perdo il lavoro e quindi non ho più un TMI?
- Come gestisco incassi e spese extra inaspettati? ES: Regalo di Natale o intervento dal dentista.

Inoltre, visto che il life planner serve anche come strumento per migliorarsi, verrà monitorato anche l'EMB. In quanto se è vero che "siamo a posto" una volta assicurato un OMB, è anche vero che è importante monitorare le proprie abitudini di spesa. 

Ad esempio potrebbe non essere sano spendere tutti i propri soldi in vestiti o videogiochi.

Monitorando le proprie spese, si ha modo di conoscere meglio se stessi e vedere se si vuol cambiar qualcosa o no.

Infine, sia per gli obiettivi che per le spese, dovranno essere forniti una serie di report per aiutarci nel monitoraggio e nell'autoanalisi.

# Perché è nato

Avevo già un life planner su Google Sheets ma volevo qualcosa di più personalizzabile e comunque dovevo imparare a programmare.

Ragion per cui, questa repository ha una cartella con le vecchie versioni del programma, tramite le quali si vede la proggressione dal semplice JS, al TS, all'uso di framework come Angular e la creazione di un BE con relativo DB.

Notasi che questo programma è pensato per la gestione di obiettivi di medio-lungo periodo. Per "obiettivi" raggiungibli in meno di un mese, ci son già tool come Google Calendar.

# Come avviare il programma.

Per quanto riguarda le versioni 3 e 4, posizionarsi nella cartella che contiene il loro FE e BE e digitare "npm run start-all" per avviarli entrambi.

Questo è un comando personalizzato definito con concurrently.

# Problemi con l'intellisense? Stai programmando ma l'IDE non rileva gli errori? 

Probabilmente perché ci sono più progetti all'interno della stessa cartella.
Il file .vscode con la relativa impostazione serve proprio a dire quale soluzione dovrebbe ricevere il supporto dell'IDE.