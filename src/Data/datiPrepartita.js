//import rnd from 'random-weight'

export const datiPrepartita = [
  {
    id: 11,
    title: "Contrattura",
    description: "Il giocatore estratto salterà la partita per infortunio.",
    isImprev: true,
    ultEstrazione: true,
    baseEstrazione: 11,
    numbExtrPlayer: 1,
    weight: 2,
  },
  {
    id: 12,
    title: "Raccomandato",
    description: "Schiera titolare il peggior giocatore in rosa per 90'",
    isImprev: true,
    ultEstrazione: false,
    numbExtrPlayer: 0,
    weight: 1,
  },
  {
    id: 13,
    title: "Veterano",
    description: "Schiera titolare il giocatore più vecchio in rosa.",
    isImprev: true,
    ultEstrazione: false,
    numbExtrPlayer: 0,
    weight: 1,
  },
  {
    id: 14,
    title: "Sotto pressione",
    description: "Se il tuo miglior giocatore offensivo non segna salta la prossima partita",
    isImprev: true,
    ultEstrazione: false,
    numbExtrPlayer: 0,
    weight: 2,
  },
  {
    id: 15,
    title: "PAROLA ALLA COMMUNITY!",
    isImprev: true,
    ultEstrazione: false,
    numbExtrPlayer: 0,
    weight: 1,
  },
  {
    id: 199,
    title: "Nessun imprevisto",
    isImprev: false,
    weight: 2,
  },
];

//export const randomDatiPrepartita = rnd(datiPrepartita, i => i.weight)
