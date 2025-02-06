//import rnd from 'random-weight'

export const datiRari = [
  {
    id: 21,
    title: "PAROLA ALLA COMMUNITY!",
    description: "",
    isImprev: true,
    ultEstrazione: false,
    numbExtrPlayer: 0,
    weight: 4,
  },
  {
    id: 22,
    title: "Agente problematico",
    description: "Il giocatore chiede il rinnovo al 50% in più del suo attuale stipendio: rinnova o cedi.",
    isImprev: true,
    ultEstrazione: true,
    baseEstrazione: 30,
    numbExtrPlayer: 1,
    weight: 1,
  },
  {
    id: 299,
    title: "Nessun imprevisto",
    isImprev: false,
    weight: 3,
  },
];

//export const randomDatiRari = rnd(datiRari, i => i.weight)
