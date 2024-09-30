import Dexie from "dexie";

export const  db = new Dexie("db");
db.version(1).stores({
    prepartita: "++id, titolo, descrizione, isImprev, ultEstrazione",
    settimana: "++id, titolo, descrizione, isImprev",
    serienegativa: "++id, titolo, descrizione, isImprev, ultEstrazione",
    speciali: "++id, titolo, descrizione, isImprev",
})
db.version(2).stores({
    prepartita: "++id, titolo, descrizione, isImprev, ultEstrazione",
    settimana: "++id, titolo, descrizione, isImprev",
    serienegativa: "++id, titolo, descrizione, isImprev, ultEstrazione",
    rinnovi: "++id, titolo, descrizione, isImprev",
    ingaggi: "++id, titolo, descrizione, isImprev",
    mercato: "++id, titolo, descrizione, isImprev",
    speciali: "++id, titolo, descrizione, isImprev, eliminaDopoEstrazione",
    sezioniAttive: "id, nomeSezione, isVisible"
})
db.version(3).stores({
    prepartita: "++id, titolo, descrizione, isImprev, ultEstrazione",
    settimana: "++id, titolo, descrizione, isImprev",
    serienegativa: "++id, titolo, descrizione, isImprev, ultEstrazione",
    rinnovi: "++id, titolo, descrizione, isImprev",
    ingaggi: "++id, titolo, descrizione, isImprev",
    mercato: "++id, titolo, descrizione, isImprev",
    speciali: "++id, titolo, descrizione, isImprev, eliminaDopoEstrazione",
    sezioniAttive: "id, nomeSezione, isVisible",
    registroGiocatori: "++id, name, description, tipo",
})
db.version(4).stores({
    prepartita: "++id, titolo, descrizione, isImprev, ultEstrazione",
    settimana: "++id, titolo, descrizione, isImprev",
    serienegativa: "++id, titolo, descrizione, isImprev, ultEstrazione",
    rinnovi: "++id, titolo, descrizione, isImprev",
    ingaggi: "++id, titolo, descrizione, isImprev",
    mercato: "++id, titolo, descrizione, isImprev",
    speciali: "++id, titolo, descrizione, isImprev, eliminaDopoEstrazione",
    sezioniAttive: "id, nomeSezione, isVisible",
    registroGiocatori: "++id, name, description, tipo",
    bonusAnnuali: "++id",
})

