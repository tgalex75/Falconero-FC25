const datiPrepartita = [
    {
        id: 1,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 2,
        title: "CONTRATTURA",
        description: "Il giocatore estratto salterà la partita per infortunio.",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 3,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 4,
        title: "STIRAMENTO",
        description: "Il giocatore estratto salta per infortunio questa partita e la prossima.",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 5,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 6,
        title: "PAROLA ALLA COMMUNITY!",
        description: "L'avete voluto voi...",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 7,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 8,
        title: "Giovane promessa",
        description: "Schiera titolare il giocatore più giovane in prima squadra",
        isImprev: true,
        ultEstrazione: false
    },
    {
        id: 9,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 10,
        title: "Predestinato",
        description: "Prendi il miglior giocatore della primavera e schieralo titolare. Confermalo per un’altra partita ogni volta che segna",
        isImprev: true,
        ultEstrazione: false
    },
    {
        id: 11,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 12,
        title: "Raccomandato",
        description: "Schiera titolare il peggior giocatore in rosa per 90'.",
        isImprev: true,
        ultEstrazione: false
    },
    {
        id: 13,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 14,
        title: "Rivoluzione tattica",
        description: "Cambia schema: se giochi a 3 dietro passa a 4 o viceversa",
        isImprev: true,
        ultEstrazione: false
    },
    {
        id: 15,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 16,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 17,
        title: "PAROLA ALLA COMMUNITY!",
        description: "Verrà estratto uno degli Imprevisti della Community",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 18,
        title: "Veterano",
        description: "Schiera titolare il giocatore più vecchio in rosa.",
        isImprev: true,
        ultEstrazione: false
    },
    {
        id: 19,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 20,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 21,
        title: "Intossicazione",
        description: "La cena di squadra è stata una tragedia. Fuori cinque titolari.",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 22,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 23,
        title: "Presuntuoso",
        description: "Se il giocatore dovesse segnare, ridiscuti il suo contratto, altrimenti cedilo",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 24,
        title: "PAROLA ALLA COMMUNITY!",
        description: "Estrazione di uno degli imprevisti proposti dalla Comunity.",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 25,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 26,
        title: "L’ora del condor",
        description: "Prendi un giocatore a scelta nella lista svincolati purché sia al massimo un 80 di overall.",
        isImprev: true,
        ultEstrazione: false
    },
    {
        id: 27,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 28,
        title: "Turnover",
        description: "La squadra è stanca. Sorteggia 3 giocatori tra i titolari. Saranno gli unici a giocare questa partita.",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 29,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 30,
        title: "Paurissima",
        description: "Gioca con il 5-4-1 e la difesa al minimo della profondità",
        isImprev: true,
        ultEstrazione: false
    },
    {
        id: 31,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 32,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 33,
        title: "PAROLA ALLA COMMUNITY!",
        description: "Estrazione di uno degli imprevisti proposti dalla Comunity.",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 34,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 35,
        title: "PAROLA ALLA COMMUNITY!",
        description: "Verrà estratto uno degli Imprevisti della Community",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 36,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 37,
        title: "nessun imprevisto",
        description: "",
        isImprev: false,
        ultEstrazione: false
    },
    {
        id: 38,
        title: "PAROLA ALLA COMMUNITY!",
        description: "Verrà estratto uno degli Imprevisti della Community",
        isImprev: true,
        ultEstrazione: true
    },
]

export default datiPrepartita;