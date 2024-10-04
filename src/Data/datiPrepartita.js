const datiPrepartita = [
  {
    id: 1,
    title: "CONTRATTURA",
    description: "Il giocatore estratto salterà la partita per infortunio.",
    isImprev: true,
    ultEstrazione: true,
    baseEstrazione: 11,
    numbExtrPlayer: 1,
  },
  {
    id: 2,
    title: "Raccomandato",
    description: "Schiera titolare il peggior giocatore in rosa per 90'",
    isImprev: true,
    ultEstrazione: false,
    numbExtrPlayer: 0,
  },
  {
    id: 3,
    title: "Veterano",
    description: "Schiera titolare il giocatore più vecchio in rosa.",
    isImprev: true,
    ultEstrazione: false,
    numbExtrPlayer: 0,
  },
  {
    id: 4,
    title: "Sotto pressione",
    description: "Se il tuo miglior giocatore offensivo non segna salta la prossima partita",
    isImprev: true,
    ultEstrazione: false,
    numbExtrPlayer: 0,
  },
];

export default datiPrepartita;
