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

  const scegliLista = random.int(1, 6);
  const listaEstrazione =
    scegliLista < 4
      ? scegliLista === 1
        ? { data: [...datiRari], listaLength: datiRari.length * 5 }
        : {
            data: [...datiMenoFrequenti],
            listaLength: datiMenoFrequenti.length * 3,
          }
      : { data: [...datiPrepartita], listaLength: datiPrepartita.length * 2 };

  const { data, listaLength } = listaEstrazione;

  const noImprevisto = {
    id: 999,
    title: "Nessun Imprevisto",
    description: "",
    isImprev: false,
  };

  const estraiNumeroCasuale = () => {
    const numeroPool = random.int(1, listaLength);
    setCasuale(
      numeroPool > data.length
        ? noImprevisto
        : listaEstrazione.data[numeroPool - 1],
    );
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
                fontFamily: "'Anton', sans-serif",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className={
                isImprev
                  ? "text-5xl font-extrabold uppercase md:relative md:top-2 md:flex-1 md:text-6xl"
                  : "invisible"
              }
            >
              {isImpCommunity ? "Imprevisto della Community" : "IMPREVISTO!"}
            </h2>
            {!isImpCommunity ? (
              <>
                <h3
                  style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
                  className={`text-4xl font-extrabold uppercase md:flex-1 md:text-5xl ${
                    title === "PAROLA ALLA COMMUNITY!" && "invisible"
                  }, ${
                    id === 999 &&
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  }`}
                >
                  {title}
                </h3>
                <p className="andika-regular mt-4 px-4 text-xl md:flex-1 md:text-3xl">
                  {description && description}
                </p>
                {/* Eccezioni */}
                <p className="andika-regular-italic animate-bounce text-sm font-normal md:text-lg">
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
            {(title === "Notte brava" || title === "Lite nello spogliatoio") &&
              console.log("Campo di input della SerieNegativa")}
          </>
        )}
      </LayoutBase>
      {Dado(estraiNumeroCasuale)}
    </>
  );
};

export default Prepartita;
