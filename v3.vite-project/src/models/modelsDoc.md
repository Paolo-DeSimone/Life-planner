
# CARTELLA MODELS

La cartella `models` contiene le classi del progetto.

Le classi sono prive della loro logica, contenuta nel relativo file della cartella `services`. Eccezione fatta per getter e setter, ed in generale per metodi che **non** hanno logica di business, ma servono solo a far funzionare a livello tecnico la classe.

In `models` quindi c'è solo il "modello" dei dati, ossia viene definito che forma hanno i dati manipolati, rappresentandoli tramite le classi.

---

# CLASSE USER

## Enum `MemberKeys`

Questo enum è creato per avere una digitazione **staticamente** controllata ed autocompletamento.

_"Staticamente"_ significa che il controllo avviene **mentre programmo**, o **prima che il programma sia eseguito**. L'opposto si dice "dinamicamente".

### Esempio
Devo scrivere:
```typescript
user.getMember(MemberKeys.name);
```
al posto di:
```typescript
user.getMember("Paolo");
```
se no dà errore perché `"Paolo"` non è una chiave valida di `MemberKeys`.

---

## Type `MemberTypes` ed uso dei generics

`type MemberTypes` mi serve per poterlo usare nei generics.

I generics sono roba tipo:
```typescript
setMember<K extends keyof MemberTypes>(member: K, value: MemberTypes[K]): void {...}
```

Usare i generics permette di avere un controllo statico sui valori che passo ai membri della classe.

Senza di essi, dovrei controllare manualmente, dentro ogni `if`/`case`, se il valore che passo è del tipo giusto, allungando il metodo.

### Esempio
Se a `MemberTypes.name` assegno:
- `true`, `0` o `undefined`, 
il programma dà errore perché si aspetta una **stringa**, non un **booleano**, un **numero** o un **undefined**.

---

## Perché ho definito il costruttore in modo così strano

La cosa più intuitiva è scrivere qualcosa tipo:

```typescript
constructor( 
    private name: string,
    private surname: string,
    private age: number,
    private TMI: number
){
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.TMI = TMI;
}
```

Ma così facendo sono obbligato a scrivere metodi più lunghi tipo:

```typescript
getMember(member : MemberKeys){
    switch(member){
        case MemberKeys.name:
            return this.name;
        case MemberKeys.surname:
            return this.surname;
        case MemberKeys.age:
            return this.age;
        case MemberKeys.TMI:
            return this.TMI;
        default:
            throw new Error("Invalid member");
    }
}
```

Invece, se inizializzo un costruttore con un oggetto che ha come chiavi `MemberKeys` e come valore `any` (i controlli di tipo sono fatti nei metodi coi generics, quindi in questo caso `any` non dà fastidio), allora posso scrivere cose tipo:

```typescript
constructor( 
    private members: Record<MemberKeys, any>
){
    this.members = members;
}

// sintatti alternativa: constructor(private members: UserMemberWithTypes) {}

getMember(member : MemberKeys){
    return this.members[member];
}
```

E per inizializzare la classe, mi basta fare così:

```typescript
const user = new User({
    name: 'Jane',
    surname: 'Doe',
    age: 30,
    TMI: 2000
});
```

Quindi non cambia quasi niente per l'inizializzazione. E allo stesso tempo ho un codice molto più sintetico, chiaro e mantenibile perché per modificare qualcosa basta cambiare `enum MemberKeys` e `type MemberTypes`.
