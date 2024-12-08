import User from "./User.js";

class Utilities {
  CreateHTMLobj(tag, id = "") {
    let element;

    switch (tag) {
      case "FunctionsBar":
        // Creazione della barra delle funzioni
        element = document.createElement("div");
        element.setAttribute("id", `${id}FunctionsBar`);
        element.style.display = "flex";
        element.style.gap = "10px"; // Spaziatura tra i pulsanti

        // Create
        const createButton = document.createElement("button");
        createButton.textContent = "+";
        createButton.title = "Create a new record";
        createButton.addEventListener("click", () => {
          this.openCreatePopup(id); // Usa "this" per chiamare il metodo della classe
        });

        // Read
        const readButton = document.createElement("button");
        readButton.textContent = "🔍";
        readButton.title = "Read records";
        readButton.addEventListener("click", () => {
          console.log("Read button clicked");
          // Aggiungi qui la logica per leggere i record
        });

        // Update
        const updateButton = document.createElement("button");
        updateButton.textContent = "✏️";
        updateButton.title = "Update a record";
        updateButton.addEventListener("click", () => {
          console.log("Update button clicked");
          // Aggiungi qui la logica per aggiornare un record
        });

        // Delete
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";
        deleteButton.title = "Delete a record";
        deleteButton.addEventListener("click", () => {
          console.log("Delete button clicked");
          // Aggiungi qui la logica per eliminare un record
        });

        // Aggiungi i pulsanti alla barra delle funzioni
        element.appendChild(createButton);
        element.appendChild(readButton);
        element.appendChild(updateButton);
        element.appendChild(deleteButton);

        break;

      case "EBMtable":
        // Creazione della tabella OBM
        element = document.createElement("table");
        element.setAttribute("id", "EBMtable");

        // Intestazione della tabella
        const headerRow = document.createElement("tr");

        const headers = [
          "Mese",
          "Anno",
          "Budget mensile",
          "Spesa",
          "Causale",
          "Note",
        ];

        headers.forEach((headerText) => {
          const th = document.createElement("th");
          th.textContent = headerText;
          headerRow.appendChild(th);
        });
        element.appendChild(headerRow);

        break;

      case "OBMtable":
        // Creazione della tabella OBM
        element = document.createElement("table");
        element.setAttribute("id", "OBMtable");

        // Intestazione della tabella
        const headerRow2 = document.createElement("tr");

        const headers2 = [
          "Obiettivo",
          "Categoria",
          "importo mensile",
          "Numero mensilità",
          "Totale",
          "Eccezioni",
          "Note",
        ];

        headers2.forEach((headerText) => {
          const th = document.createElement("th");
          th.textContent = headerText;
          headerRow2.appendChild(th);
        });
        element.appendChild(headerRow2);

        break;

      case "OBMtimeline":
        // Creazione del contenitore della timeline
        element = document.createElement("div");
        element.setAttribute("id", "OBMtimeline");

        // Aggiunta di un evento alla timeline
        const timelineEvent = document.createElement("div");
        timelineEvent.classList.add("timeline-event");

        const eventDate = document.createElement("div");
        eventDate.classList.add("event-date");
        eventDate.textContent = "Gennaio 2024";

        const eventDescription = document.createElement("div");
        eventDescription.classList.add("event-description");
        eventDescription.textContent =
          "Raggiunto il primo obiettivo di risparmio!";

        timelineEvent.appendChild(eventDate);
        timelineEvent.appendChild(eventDescription);

        element.appendChild(timelineEvent);

        break;

      default:
        console.error(`Il tag ${tag} non è supportato.`);
        break;
    }

    return element;
  }

  // Funzione per aprire il popup
  openCreatePopup(id = "") {
    switch (id) {
      case "OBMtable":
        // Creazione del popup
        const popup = document.createElement("div");
        popup.setAttribute("id", `${id}Popup`);
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "white";
        popup.style.border = "1px solid #ccc";
        popup.style.padding = "20px";
        popup.style.zIndex = "1000";

        const inputFields = [
          "Obiettivo",
          "Categoria",
          "Importo Mensile",
          "Numero Mensilità",
          "Totale",
          "Eccezioni",
          "Note",
        ];

        // Aggiungi input per ogni intestazione
        inputFields.forEach((inputField) => {
          const label = document.createElement("label");
          label.textContent = inputField;
          label.style.display = "block";

          const input = document.createElement("input");
          input.setAttribute("type", "text");
          input.setAttribute(
            "name",
            inputField.toLowerCase().replace(/\s/g, "")
          );
          input.setAttribute("id", inputField);
          input.style.display = "block";
          input.style.marginBottom = "10px";

          popup.appendChild(label);
          popup.appendChild(input);
        });

        // Bottone per aggiungere un record
        const addButton = document.createElement("button");
        addButton.textContent = "Aggiungi Record";
        addButton.addEventListener("click", () => {
          const user = new User();
          const ObjectivesTotalBudget = calculateImportoMensileTotal();
          const EMBInputFieldInsidePopup =
            document.getElementById("Importo Mensile");

          //verifica che il totale degli importi mensili già in tabella + quello che stai per aggiungere sia <= dell'MTI (Montly Total Income) dell'utente
          //Se si, aggiungi i dati del popup in tabella, se no mostra un alert
          if (
            Number(ObjectivesTotalBudget) +
              Number(EMBInputFieldInsidePopup.value) <=
            user.OBM
          ) {
            if (Number(EMBInputFieldInsidePopup.value) === 0) {
              alert(
                "Non puoi inserire un obiettivo senza destinarci un budget"
              );
            } else {
              this.addRecordToTable(popup); // Usa "this" per accedere al metodo della classe
            }
          } else {
            alert(
              `Impossibile aggiungere il nuovo obiettivo alla tabella perché supera il tuo budget mensile obiettivi`
            );
          }

          function calculateImportoMensileTotal() {
            // Trova la tabella
            const OBMtable = document.getElementById("OBMtable");
            // Trova l'indice della colonna "importo mensile"
            const headerCells = OBMtable.rows[0].cells; // Le celle della prima riga (intestazioni)
            let importoMensileIndex = -1;

            for (let i = 0; i < headerCells.length; i++) {
              if (
                headerCells[i].textContent.toLowerCase().trim() ===
                "importo mensile"
              ) {
                importoMensileIndex = i;
                break;
              }
            }

            // Controlla che la colonna sia stata trovata
            if (importoMensileIndex === -1) {
              console.error("Colonna 'importo mensile' non trovata.");
            } else {
              // Somma i valori nella colonna
              let somma = 0;
              for (let i = 1; i < OBMtable.rows.length; i++) {
                // Salta la prima riga (intestazione)
                const cell = OBMtable.rows[i].cells[importoMensileIndex];
                if (cell) {
                  const valore = parseFloat(
                    cell.textContent.replace("€", "").trim()
                  ); // Rimuovi "€" e converte in numero
                  if (!isNaN(valore)) {
                    somma += valore;
                  }
                }
              }
              return somma;
            }
          }
        });

        // Bottone per chiudere il popup
        const closeButton = document.createElement("button");
        closeButton.textContent = "Chiudi";
        closeButton.style.marginLeft = "10px";
        closeButton.addEventListener("click", () => {
          popup.remove();
        });

        popup.appendChild(addButton);
        popup.appendChild(closeButton);

        // Aggiungi il popup al body
        document.body.appendChild(popup);
        break;
      case "EBMtable":
        console.error(`sei qui`);
        break;
      default:
        console.error(`l'id ${id} non è supportato.`);
        break;
    }
  }

  // Funzione per aggiungere un record alla tabella
  addRecordToTable(popup) {
    const table = document.getElementById("OBMtable");
    if (!table) {
      console.error("Tabella OBMtable non trovata!");
      return;
    }

    const row = document.createElement("tr");
    const inputs = popup.querySelectorAll("input");

    inputs.forEach((input) => {
      const cell = document.createElement("td");
      cell.textContent = input.value || "N/A"; // Usa "N/A" se il campo è vuoto
      row.appendChild(cell);
    });

    table.appendChild(row); // Aggiungi la nuova riga alla tabella
    popup.remove(); // Chiudi il popup
  }
}

export default Utilities;
