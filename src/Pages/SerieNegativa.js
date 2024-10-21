import React, { useState } from "react";
import Dado from "../Components/Dado";
import random from "random";
import datiSerieNegativa from "../Data/datiSerieNegativa";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import RegistroSerieNegativa from "../Components/RegistroSerieNegativa";
import { motion } from "framer-motion";
import UploadRegistro from "../Funzioni/UploadRegistro";
const SerieNegativa = () => {
  const [casuale, setCasuale] = useState(null);

  // Prima Estrazione

  const estraiNumeroCasuale = () => {
    setCasuale(random.choice(datiSerieNegativa));
  };

  const {
    title,
    description,
    isImprev,
    ultEstrazione,
    baseEstrazione,
    numbExtrPlayer,
  } = casuale ? casuale : {};

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-around gap-2 px-4 py-6 font-bold md:p-8">
      <h1>Serie Negativa</h1>

      {/* BOX PRIMA ESTRAZIONE */}
      <motion.div
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        key={casuale}
        id="containerPrimaEstrazione"
        style={isImprev ? { color: "var(--clr-ter)" } : {}}
        className="flex h-full w-full select-none flex-col items-center justify-evenly gap-2 rounded-xl bg-black/50 px-4 py-2 text-center shadow-lg ring ring-inset ring-white/75 md:px-10"
      >
        {!casuale ? (
          <h2 className="andika-regular-italic text-5xl italic">
            Buzzzz it!...
          </h2>
        ) : (
          <>
            <div className="flex h-full w-full flex-col items-center justify-around py-4 md:w-3/4 md:self-end md:py-2">
              <h2
                style={{
                  fontFamily: "'Anton', sans-serif",
                  filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
                }}
                className={
                  isImprev
                    ? "text-3xl font-extrabold uppercase md:flex-1 md:text-7xl"
                    : "hidden"
                }
              >
                imprevisto!
              </h2>
              <h3
                style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
                className="flex items-center justify-center text-3xl font-extrabold uppercase md:flex-1 md:text-5xl"
              >
                {title}
              </h3>
              {isImprev && (
                <p
                  style={{
                    filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
                  }}
                  className="text-md andika-regular px-2 md:w-5/6 md:flex-1 md:text-2xl"
                >
                  {description}
                </p>
              )}

              {ultEstrazione && (
                <SecondaEstrazioneDiretta
                  numbExtrPlayer={numbExtrPlayer}
                  baseEstrazione={baseEstrazione}
                />
              )}
              {isImprev && <UploadRegistro title={title} />}
              <RegistroSerieNegativa />
            </div>
          </>
        )}
      </motion.div>

      {<Dado clickFunc={estraiNumeroCasuale} />}
    </section>
  );
};

export default SerieNegativa;
