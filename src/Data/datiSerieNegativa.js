const datiSerieNegativa = [
  {
    id: 401,
    title: "Squadra contro",
    description:
      "4 Top player, i più forti, si ribellano al mister. Mettili fuori squadra. Se vinci riconquisti la loro fiducia fino a fine stagione. Se perdi o pareggi, la prossima partita se ne aggiunge un altro.",
    isImprev: true,
    ultEstrazione: false,
    numbExtrPlayer: 0,
  },
  {
    id: 402,
    title: "Gelosia",
    description:
      "I due giocatori estratti iniziano una lite e finiscono fuori squadra. Da ora l’imprevisto si rifarà a loro fino a fine stagione. Se viene risorteggiato dovrai scegliere chi tenere cedendo l’altro alla prima finestra utile.",
    isImprev: true,
    ultEstrazione: true,
    baseEstrazione: 30,
    numbExtrPlayer: 2,
  },
  {
    id: 403,
    title: "Rivalità",
    description:
      "Il giocatore sorteggiato entra in competizione con il suo miglior pari ruolo fino a fine stagione. Quello che a fine stagione avrà un voto medio migliore sarà confermato con stipendio aumentato, l’altro sarà ceduto.",
    isImprev: true,
    ultEstrazione: true,
    baseEstrazione: 30,
    numbExtrPlayer: 1,
  },
  {
    id: 404,
    title: "Preferito",
    description:
      "Il tuo giocatore più forte, per overall, chiede la cessione: se è la prima volta puoi decidere se annullare l’imprevisto in cambio di un rinnovo maggiorato. Se capita la seconda volta, devi metterlo per forza sul mercato e cederlo alla prima offerta pari o superiore al suo valore.",
    isImprev: true,
    ultEstrazione: false,
    numbExtrPlayer: 0,
  },
  {
    id: 405,
    title: "Nessuna conseguenza",
    description: "",
    isImprev: false,
  },
];

export default datiSerieNegativa;
