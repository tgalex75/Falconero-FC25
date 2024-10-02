import React, { useState } from "react";
import datiPrepartita from "../Data/datiPrepartita";
import datiMenoFrequenti from "../Data/datiMenoFrequenti";
import datiRari from "../Data/datiRari";
//import SecondaEstrazione from "../Components/SecondaEstrazione";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
//import { motion } from "framer-motion";
import LayoutBase from "../Components/LayoutBase";
import Dado from "../Components/Dado";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import random from "random";

const Prepartita = () => {
  const [casuale, setCasuale] = useState(null);

  // Prima Estrazione

  const scegliLista = random.int(1, 9);
  const listaEstrazione =
    scegliLista < 4
      ? scegliLista === 1
        ? [...datiRari]
        : [...datiMenoFrequenti]
      : datiPrepartita;


  const estraiNumeroCasuale = () => {
    setCasuale(random.choice(listaEstrazione));
  };

  const {
    id,
    title,
    description,
    isImprev,
    ultEstrazione,
    numbExtrPlayer,
    notaBene,
  } = casuale ? casuale : {};

  const titoloH1 = "Imprevisto Prepartita";
  const isImpCommunity = title === "PAROLA ALLA COMMUNITY!";

  return (
    <>
      <LayoutBase
        titoloH1={titoloH1}
        id={id}
        isImprev={isImprev}
        casuale={casuale}
      >
        {casuale && (
          <>
            <h2
              style={{
                fontFamily: "'Boogaloo', sans-serif",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className={
                isImprev
                  ? "text-5xl font-extrabold uppercase md:relative md:top-2 md:flex-1 md:text-6xl"
                  : "hidden"
              }
            >
              {isImpCommunity ? "Imprevisto della Community" : "IMPREVISTO!"}
            </h2>
            {!isImpCommunity ? (
              <>
                <h3
                  style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
                  className={`text-4xl font-extrabold uppercase md:flex-1 md:text-5xl ${
                    title === "PAROLA ALLA COMMUNITY!" && "hidden"
                  }`}
                >
                  {title}
                </h3>
                <p
                  style={{ fontFamily: "'Handlee', cursive" }}
                  className="mt-4 px-4 text-xl md:flex-1 md:text-3xl"
                >
                  {description && description}
                </p>
                {/* Eccezione imprevisto n. 28 */}
                <p className="text-sm italic md:text-lg">
                  {notaBene && notaBene}
                </p>
              </>
            ) : (
              <>
                <FetchImprevisto />
              </>
            )}
            {ultEstrazione && (
              <SecondaEstrazioneDiretta numbExtrPlayer={numbExtrPlayer} />
            )}
          </>
        )}
      </LayoutBase>
      {Dado(estraiNumeroCasuale)}
    </>
  );
};

export default Prepartita;
