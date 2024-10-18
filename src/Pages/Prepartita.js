import React, { useState, useRef } from "react";
import datiPrepartita from "../Data/datiPrepartita";
import UploadRegistro from "../Funzioni/UploadRegistro";
import datiMenoFrequenti from "../Data/datiMenoFrequenti";
import datiRari from "../Data/datiRari";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
import LayoutBase from "../Components/LayoutBase";
import Dado from "../Components/Dado";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import random from "random";

const Prepartita = () => {
  const [casuale, setCasuale] = useState(null);

  const inputRef = useRef(null);


  // Prima Estrazione

  
  const noImprevisto = {
    id: 999,
    title: "Nessun Imprevisto",
    description: "",
    isImprev: false,
  };
  
  const estraiNumeroCasuale = () => {
    const scegliLista = random.int(1, 5);
    const listaEstrazione =
      scegliLista < 4
        ? scegliLista === 1
          ? { data: [...datiRari], listaLength: datiRari.length * 3 }
          : {
              data: [...datiMenoFrequenti],
              listaLength: datiMenoFrequenti.length * 2,
            }
        : { data: [...datiPrepartita], listaLength: (datiPrepartita.length + 4) }; //escluso dal conteggio Imprevisto Community per aumentare la percentuale di imprevisto
  
    const { data, listaLength } = listaEstrazione;
    const numeroPool = random.int(1, listaLength);
    setCasuale(
      numeroPool > data.length
        ? noImprevisto
        : random.choice(data),
      // datiPrepartita[4]     //TEST IMPREVISTI COMMUNITY
    );
    //console.log("numero lista estratta: ", scegliLista);
    //console.log("Lista estratta nel dettaglio: ", data);
    //console.log("Numero estratto: ", numeroPool);
    //console.log("Lunghezza Lista: ", listaLength);
  };
  
  const {
    id,
    title,
    description,
    isImprev,
    ultEstrazione,
    baseEstrazione,
    numbExtrPlayer,
    notaBene,
  } = casuale ? casuale : {};
  
  const titoloH1 = "Prepartita";
  const isImpCommunity = title === "PAROLA ALLA COMMUNITY!";
  
  
  //console.log("Casuale: ", id, title);

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
                  : "invisible"
              }
            >
              {isImpCommunity ? "Imprevisto della Community" : "IMPREVISTO!"}
            </h2>
            {!isImpCommunity ? (
              <>
                <h3
                  style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
                  className={`text-4xl font-extrabold uppercase md:flex-1 ${
                    title === "PAROLA ALLA COMMUNITY!" && "invisible"
                  }, ${
                    id === 999 &&
                    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:absolute"
                  }`}
                >
                  {title}
                </h3>
                <p className="andika-regular mt-4 w-3/4 px-4 text-xl md:flex-1 md:text-2xl">
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
              <SecondaEstrazioneDiretta
                numbExtrPlayer={numbExtrPlayer}
                baseEstrazione={baseEstrazione}
              />
            )}
            {(title === "Notte brava" || title === "Lite nello spogliatoio") &&
              <UploadRegistro inputRef={inputRef} title={title} />}
          </>
        )}
      </LayoutBase>
      {<Dado clickFunc={estraiNumeroCasuale} />}
    </>
  );
};

export default Prepartita;
