export const datiMenoFrequenti = [
  {
    id: 1,
    title: "Lite nello spogliatoio",
    description:
      "I due giocatori vengono puniti con la tribuna per la partita in corso",
    isImprev: true,
    ultEstrazione: true,
    baseEstrazione: 30,
    numbExtrPlayer: 2,
    weight: 10,
  },
  {
    id: 2,
    title: "Notte brava",
    description:
      "Il giocatore è arrivato tardi agli allenamenti. Tribuna per una partita. Se capita una seconda volta in stagione fuori un mese. Se capita una terza, cessione obbligatoria.",
    isImprev: true,
    ultEstrazione: true,
    baseEstrazione: 30,
    numbExtrPlayer: 1,
    weight: 10,
  },
  {
    id: 3,
    title: "Giovane promessa",
    description: "Schiera titolare il giocatore più giovane in prima squadra",
    isImprev: true,
    ultEstrazione: false,
    numbExtrPlayer: 0,
    weight: 10,
  },
  {
    id: 4,
    title: "Turnover",
    description:
      "La squadra è stanca. Sorteggia 3 giocatori tra i titolari. Saranno gli unici a giocare questa partita.",
    isImprev: true,
    ultEstrazione: true,
    baseEstrazione: 11,
    numbExtrPlayer: 3,
    notaBene:
      "Non si applica alle partite determinanti (es. turni di ritorno, partite secche, scontri diretti)",
    weight: 7,
  },
  {
    id: 5,
    title: "PAROLA ALLA COMMUNITY!",
    description: "",
    isImprev: true,
    ultEstrazione: false,
    numbExtrPlayer: 0,
    weight: 15,
  },
  {
    id: 999,
    title: "Nessun imprevisto",
    isImprev: false,
    weight: 15,
  },
];
