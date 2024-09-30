const datiSerieNegativa = [
    {
        id: 1,
        title: "Crisi",
        description:
            "il giocatore estratto viene sostituito dal peggior pari ruolo in squadra. Se questo segna resta titolare fin quando non si interrompe la striscia.",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 2,
        title: "Squadra contro",
        description:
            "4 top player, i più forti, si ribellano al mister. Mettili fuori squadra. Se vinci riconquisti la loro fiducia fino a fine stagione. Se perdi o pareggi, la prossima partita se ne aggiunge un altro.",
        isImprev: true,
        ultEstrazione: false
    },
    {
        id: 3,
        title: "nessuna conseguenza",
        description: "",
        isImprev: false,
        ultEstrazione: false,
    },
    {
        id: 4,
        title: "Gelosia",
        description:
            "I due giocatori estratti iniziano una lite e finiscono fuori squadra. Da ora l’imprevisto si rifarà a loro fino a fine stagione. Se viene risorteggiato dovrai scegliere chi tenere cedendo l’altro alla prima finestra utile.",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 5,
        title: "Rivalità",
        description:
            "il giocatore sorteggiato entra in competizione con il suo miglior pari ruolo fino a fine stagione. Quello che a fine stagione avrà un voto medio migliore sarà confermato con stipendio aumentato, l’altro sarà ceduto.",
        isImprev: true,
        ultEstrazione: true
    },
    {
        id: 6,
        title: "Notte brava",
        description:
            "Il giocatore estratto è arrivato tardi agli allenamenti. Tribuna per una partita. Se capita una seconda volta in stagione fuori un mese. Se capita una terza, cessione obbligatoria.",
        isImprev: true,
        ultEstrazione: true
    },
];

export default datiSerieNegativa;
