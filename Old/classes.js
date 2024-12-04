class Utilities {
    constructor() {
        this.months = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
    }

    generateYearsHeaders(years, gridHeaderId) {
        const date = new Date();
        let currentYear = date.getFullYear();      
        for (let i = 0; i < years; i++) {
            let gridHeader = document.getElementById(gridHeaderId);
            let yearHeader = document.createElement("th");
            yearHeader.colSpan = 12;
            yearHeader.classList.add("sticky");
            yearHeader.innerText = currentYear;
            gridHeader.appendChild(yearHeader);
            this.generateMonths(12, "MonthsColumns");
            currentYear++;
        }
    }

    generateMonths(cellsToGenerate, gridId) {
        const rowToPlaceCellsToGenerate = document.getElementById(gridId);

        if (!rowToPlaceCellsToGenerate) {
            console.error(`Grid row with ID '${gridId}' not found.`);
            return;
        }

        for (let i = 0, j = 0; i < cellsToGenerate; i++, j++) {
            let cell = document.createElement("th"); // Usa <th> per l'intestazione
            cell.classList.add("sticky");
            cell.textContent = this.months[j];
            rowToPlaceCellsToGenerate.appendChild(cell); // Aggiungi la cella direttamente alla riga

            if (j === 12 - 1) { // Ricomincia da capo quando j è 11
                j = -1; // Resetta j (-1 perché il for aggiunge j++)
            }
        }
    }
}

class User {
    static #name = "Paolo";
    static #income = 1500;

    constructor() {
        // Eventuali inizializzazioni per l'istanza
    }

    // Metodo della classe User
    displayUserInfo() {
        console.log("ORIGINALE - " + this.constructor.#name + " guadagna " + this.constructor.#income + " dobloni");
    }
    static getIncome() {
        return this.#income; // funzione getter
    }
    static setIncome(newIncome) {
        this.#income = newIncome; // funzione setter
    }
}

class Project extends User{
    constructor(name, description, deadline, category, montlyBudget) {
        super() 
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.category = category;
        this.montlyBudget = montlyBudget;
        this.total = montlyBudget * 12;
        this.grid = document.getElementById("longPeriodGrid").querySelector("tbody");
        this.totalRowExist = false;
        this.observers = []
    }

    addObserver(newObserver){
        this.observers.push(newObserver)
    }

    notifyObserver(observer) {
        if (observer && typeof observer.checkAffordability === "function") {
            observer.checkAffordability();
            console.log(observer)
        } else {
            console.error("Observer non valido o metodo checkAffordability non trovato.");
        }
    }
        

    /**
     * Aggiunge nuove righe alla griglia e aggiorna il totale mensile.
     * - Crea 5 nuove righe con i dati di nome, budget, totale, eccezioni e note.
     * - Calcola e aggiorna la riga totale alla fine della tabella.
     *
     * @method Add
     * @returns {void}
     */
    Add() {
        let montlyExpances = 0;

        // Aggiunta di nuove righe
        for (let a = 0; a < 5; a++) {
            const row = this.createRow();
            this.grid.appendChild(row);
            montlyExpances += this.montlyBudget;
        }

        // Gestione della riga totale
        this.updateTotalsRow(montlyExpances);
        if (document.getElementById("totalsRow").textContent > User.getIncome()){
            this.notifyObserver(this.observers[0])
        }
    }

    /**
     * Crea una riga per la griglia con i dati del progetto.
     * @returns {HTMLElement} La riga creata.
     */
    createRow() {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = this.name;

        const budgetCell = document.createElement("td");
        budgetCell.textContent = this.montlyBudget;

        const totalCell = document.createElement("td");
        totalCell.textContent = this.total;

        const exceptions = document.createElement("td");
        exceptions.textContent = "+";

        const notes = document.createElement("td");
        notes.textContent = "+";

        row.appendChild(nameCell);
        row.appendChild(budgetCell);
        row.appendChild(totalCell);
        row.appendChild(exceptions);
        row.appendChild(notes);

        return row;
    }

    /**
     * Aggiunge o aggiorna la riga del totale nella griglia.
     * @param {number} montlyExpances - La somma delle spese mensili.
     */
    updateTotalsRow(montlyExpances) {
        let totalsRow = document.getElementById("totalsRow");
        if (!totalsRow) {
            totalsRow = this.createTotalsRow(montlyExpances);
            this.grid.appendChild(totalsRow);
            this.totalRowExist = true;
        } else {
            this.updateExistingTotalsRow(totalsRow, montlyExpances);
        }
    }

    /**
     * Crea una nuova riga totale.
     * @param {number} montlyExpances - La somma delle spese mensili.
     * @returns {HTMLElement} La riga totale.
     */
    createTotalsRow(montlyExpances) {
        const totalsRow = document.createElement("tr");
        totalsRow.id = "totalsRow";
        totalsRow.style.backgroundColor = "blue";

        const totalsCell = document.createElement("td");
        totalsCell.id = "totalsCell";
        totalsCell.colSpan = 5;
        totalsCell.style.color = "white";
        totalsCell.textContent = montlyExpances;

        totalsRow.appendChild(totalsCell);
        return totalsRow;
    }

    /**
     * Aggiorna la riga totale esistente.
     * @param {HTMLElement} totalsRow - La riga totale esistente.
     * @param {number} montlyExpances - La somma delle spese mensili.
     */
    updateExistingTotalsRow(totalsRow, montlyExpances) {
        const totalsCell = document.getElementById("totalsCell");
        totalsCell.textContent = parseFloat(totalsCell.textContent) + montlyExpances;
        this.grid.appendChild(totalsRow)
    }
}

class montlybudget extends Project {
    static invesments = User.getIncome() * 30 / 100; // accedo ad una proprietà statica di User con un metodo getter
    static expances = User.getIncome() * 30 / 100;
    static savings = User.getIncome() * 40 / 100;

    constructor() {
        super(); // Chiamata al costruttore della classe base
        this.invesments = User
    }

    // Sovrascrivo il metodo displayUserInfo della classe User
    displayUserInfo() {
        // this.constructor si riferisce alla classe istanziata col comando const projectInstance = new Project(). In questo esempio quindi a "Project"
        // Se non c'è la creazione di una istanza con "new", e quindi si scrive qualcosa tipo Project.displayUserInfo,
        // si riferisce alla classe in cui il metodo è creato, in questo caso User.
        console.log(`OVERRIDE - Investments: ${montlybudget.invesments} Expances: ${this.constructor.expances}`);

    }

    checkAffordability(){
        alert("Sei povero")
    }
}
export default montlybudget; // Esportiamo la classe


