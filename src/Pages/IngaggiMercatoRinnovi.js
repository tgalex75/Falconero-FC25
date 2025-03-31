import React, { useState } from "react";
import Dado from "../Components/Dado";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import BonusAnnuali from "../Components/BonusAnnuali";

const IngaggiMercatoRinnovi = (props) => {
  const [casuale, setCasuale] = useState(null);

  const estraiNumeroCasuale = () => {
    setCasuale(Math.floor(Math.random() * 10) + 1);
  };

  const isImpr = casuale === 7;

  const tipoImprevisto = props.tipoImprevisto;

  const listaMsgImprevisto = [
    {
      tipo: "Mercato",
      msgIsImpr: "Mercenario",
      msgNoImpr: "Bilancio OK",
      descrIsImpr: "Accetta l'offerta o raddoppia l'ingaggio appena possibile",
      descrNoImpr: "Totale libertà di scelta",
      linkTo: "/offerte-mercato",
      linkDesc: "Imprevisti Calciomercato",
    },
    {
      tipo: "Ingaggio",
      msgIsImpr: "Visite non superate",
      msgNoImpr: "Visite OK",
      descrIsImpr:
        "La trattativa salta e non può essere ritentata fino alla prossima finestra di mercato.",
      descrNoImpr: "La trattativa viene chiusa senza conseguenze.",
      linkTo: "/ingaggio",
      linkDesc: "Imprevisti di Ingaggio",
    },
  ];

  const msgImprevisto = listaMsgImprevisto.filter(
    (el) => el.tipo === tipoImprevisto,
  );

  const { msgNoImpr, msgIsImpr, descrIsImpr, descrNoImpr } = msgImprevisto[0];

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-around gap-2 px-4 py-6 font-bold md:p-8">
      <h1>{isMobile ? tipoImprevisto : `Imprevisti ${tipoImprevisto}`}</h1>
      {/* BOX PRIMA ESTRAZIONE */}
      <motion.div
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        key={casuale}
        id="containerPrimaEstrazione"
        style={isImpr ? { color: "var(--clr-ter)" } : {}}
        className="flex h-full w-full select-none flex-col items-center justify-around rounded-xl bg-black/50 px-4 pb-4 text-center shadow-lg ring ring-inset ring-white/75 md:px-10 md:pb-8"
      >
        {!casuale && (
          <h2 className="andika-regular-italic text-5xl italic">
            Buzzzz it!...
          </h2>
        )}
        {casuale && (
          <>
            <h2
              style={{
                fontFamily: "'Anton', sans-serif",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className={
                isImpr
                  ? "text-5xl font-extrabold uppercase md:text-7xl"
                  : "hidden"
              }
            >
              imprevisto!
            </h2>
            <h3
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="text-4xl font-extrabold uppercase md:text-6xl"
            >
              {isImpr ? msgIsImpr : msgNoImpr}
            </h3>
            <p
              style={{
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className="andika-regular mt-4 px-4 text-2xl md:w-3/5 md:text-4xl"
            >
              {isImpr ? descrIsImpr : descrNoImpr}
            </p>
          </>
        )}
        {isImpr && <BonusAnnuali />}
      </motion.div>

      {<Dado clickFunc={estraiNumeroCasuale} />}
    </section>
  );
};

export default IngaggiMercatoRinnovi;
