import React, { useState } from "react";
import Dado from "../Components/Dado";
import random from "random";
import datiSettimana from "../Data/datiSettimana";
import SecondaEstrazione from "../Components/SecondaEstrazione";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
import LayoutBase from "../Components/LayoutBase";

const Settimana = () => {
  const [casuale, setCasuale] = useState(null);

  // Prima Estrazione

  const estraiNumeroCasuale = () => {
    setCasuale(random.choice(datiSettimana));
  };

  const { id, title, description, isImprev } = casuale ? casuale : {};

  const titoloH1 = "Settimanale";
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
                  ? "text-5xl font-extrabold uppercase md:relative md:top-2 md:flex-1 md:text-5xl"
                  : "hidden"
              }
            >
              {isImpCommunity ? "Imprevisto della Community" : "IMPREVISTO!"}
            </h2>

            {!isImpCommunity ? (
              <>
                <h3
                  style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
                  className={`text-4xl font-extrabold uppercase md:flex-1 ${
                    title === "PAROLA ALLA COMMUNITY!" && "hidden"
                  }, ${
                    id > 100 &&
                    "left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 md:absolute"
                  }`}
                >
                  {title}
                </h3>
                <p
                  style={{
                    filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
                  }}
                  className={`andika-regular mt-4 text-2xl md:flex-1 ${
                    id > 100 &&
                    "left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 md:absolute"
                  }`}
                >
                  {description}
                </p>
                {/* Eccezione imprevisto n. 28 */}
                <p className="mb-8 animate-bounce text-xl italic">
                  {id === 8 || id === 16
                    ? "Non applicabile se il giocatore estratto è in prestito. In tal caso si ripete l’estrazione."
                    : ""}
                </p>
              </>
            ) : (
              <>
                <FetchImprevisto />
                <SecondaEstrazione />
              </>
            )}
          </>
        )}
      </LayoutBase>
      {<Dado clickFunc={estraiNumeroCasuale} />}
    </>
  );
};

export default Settimana;
