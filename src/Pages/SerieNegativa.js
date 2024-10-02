import React, { useState, useContext, useRef } from "react";
import Dado from "../Components/Dado";
import { randomNumber } from "../Funzioni/RandomNumber";
import { CartContext } from "../context/regContext";
import datiSerieNegativa from "../Data/datiSerieNegativa";
import SecondaEstrazione from "../Components/SecondaEstrazione";
import RegistroSerieNegativa from "../Components/RegistroSerieNegativa";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";

const SerieNegativa = () => {
  const [casuale, setCasuale] = useState(null);

  const inputRef = useRef(null);

  const { addToCart } = useContext(CartContext);

  // Prima Estrazione

  const estraiNumeroCasuale = () => {
    setCasuale(randomNumber(datiSerieNegativa));
  };

  const { id, title, description, isImprev, ultEstrazione } = casuale
    ? datiSerieNegativa[casuale - 1]
    : {};

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-around gap-2 px-4 py-6 font-bold md:p-8">
      <h1>{isMobile ? "Serie Negativa" : "Imprevisto Serie Negativa"}</h1>

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
          <h2
            style={{ fontFamily: "'Handlee', cursive" }}
            className="text-5xl italic"
          >
            Buzzzz it!...
          </h2>
        ) : (
          <>
            <div className="flex h-full w-full md:w-3/4 flex-col items-center justify-around py-4 md:self-end md:py-2">
              <h2
                style={{
                  fontFamily: "'Boogaloo', sans-serif",
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
                className="flex items-center justify-center text-3xl font-extrabold uppercase md:flex-1 md:text-6xl"
              >
                {title}
              </h3>
              {isImprev && (
                <p
                  style={{
                    fontFamily: "'Handlee', cursive",
                    filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
                  }}
                  className="text-md px-4 md:flex-1 md:text-2xl md:w-3/4"
                >
                  {description}
                </p>
              )}
            

            {ultEstrazione && <SecondaEstrazione />}
            {id > 3 && (
              <div className="w-full md:w-3/4 flex flex-col items-center">
                <label
                  htmlFor="nome-giocatore"
                  className="mb-1 inline-block text-xs text-gray-300 md:text-sm"
                >
                  Giocatore da iscrivere sul registro
                </label>
                <div className="flex w-1/2 h-1/2 items-center justify-between gap-1">
                  <input
                    ref={inputRef}
                    type="text"
                    id="nome-giocatore"
                    className="h-full w-full appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-1 py-2 text-xs text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 md:px-4 md:text-sm"
                    name="nomeGiocatore"
                    placeholder={isMobile ? "Nome..." : "Fuori il nome..."}
                  />
                  <button
                    type="button"
                    className="flex h-full w-full items-center justify-center rounded-lg bg-sky-700 px-4 py-2 text-center text-xs font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200 md:text-sm "
                    onClick={() =>
                      addToCart({
                        title: `${inputRef.current.value} - ${title}`.toUpperCase(),
                        quantity: 1,
                      })
                    }
                  >
                    Invia
                  </button>
                </div>
              </div>
            )}
            <RegistroSerieNegativa />
        </div>
          </>
        )}
      </motion.div>

      {Dado(estraiNumeroCasuale)}
    </section>
  );
};

export default SerieNegativa;
