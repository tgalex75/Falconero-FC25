/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from "react";
import useFetchData from "../Hooks/useFetchData";
import { datiPrepartita } from "../Data/datiPrepartita";
import UploadRegistro from "../Funzioni/UploadRegistro";
import { datiMenoFrequenti } from "../Data/datiMenoFrequenti";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
import LayoutBase from "../Components/LayoutBase";
import Dado from "../Components/Dado";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import BonusAnnuali from "../Components/BonusAnnuali";
import RegistroSerieNegativa from "../Components/RegistroSerieNegativa";
import rnd from "random-weight";
import random from "random";
import { numbers } from "../Funzioni/schemi";
import pickRandom from "pick-random";

const Prepartita = () => {
  const { data: dataCommunity, fetchRegistryList } = useFetchData("imprevisti");
  const [casuale, setCasuale] = useState(null);
  const [casualeCommunity, setCasualeCommunity] = useState(null);

  const [extractedPlayer, setExtractedPlayer] = useState(null);

  
  useEffect(() => {
    setCasualeCommunity(
      dataCommunity?.length > 0
      ? random.choice(dataCommunity)
        : { id: 0, descrizione: "LISTA VUOTA!!!" },
      );
    fetchRegistryList();
    let timeout = setTimeout(() => {
      setExtractedPlayer(pickRandom(numbersEx, { count: numbExtrPlayer }));
    }, 200);
    return () => clearTimeout(timeout);
  }, [casuale]);

  // Prima Estrazione

  const estraiNumeroCasuale = useCallback(() => {
    const randomDatiPrepartita = rnd(datiPrepartita, (i) => i.weight);
    const randomDatiMenoFrequenti = rnd(datiMenoFrequenti, (i) => i.weight);
    const listaEstrazione = [
      { ...randomDatiPrepartita, weight: 25 },
      { ...randomDatiMenoFrequenti, weight: 10 },
    ];
    const estratto = rnd(listaEstrazione, (i) => i.weight);
    setCasuale(estratto);
  }, []);
  
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
  const numbersEx = numbers(baseEstrazione)

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
                  ? "text-7xl xl:text-5xl font-extrabold uppercase md:relative md:top-2 md:flex-1"
                  : "invisible"
              }
            >
              {isImpCommunity ? "Imprevisto della Community" : "IMPREVISTO!"}
            </h2>
            {!isImpCommunity && (
              <>
                <h3
                  className={`flex-1 text-6xl xl:text-4xl font-extrabold uppercase ${
                    title === "PAROLA ALLA COMMUNITY!" && "invisible"
                  }, ${
                    id === 999 &&
                    "absolute left-1/2 top-1/3 xl:top-1/2 -translate-x-1/2 -translate-y-1/2"
                  }`}
                >
                  {title}
                </h3>
                <p className="andika-regular xl:mt-4 w-4/5 xl:w-1/2 px-4 text-3xl md:flex-1 xl:text-2xl">
                  {description && description}
                </p>

                {/* Eccezioni */}
                <p className="andika-regular-italic animate-bounce text-sm font-normal md:text-lg">
                  {notaBene && notaBene}
                </p>
              </>
            )}

            {isImpCommunity && (
              <FetchImprevisto
                extractedPlayer={extractedPlayer}
                setExtractedPlayer={setExtractedPlayer}
                casualeCommunity={casualeCommunity}
              />
            )}

            {ultEstrazione && !isImpCommunity && (
              <SecondaEstrazioneDiretta
                numbExtrPlayer={numbExtrPlayer}
                extractedPlayer={extractedPlayer}
              />
            )}
            {title === "Notte brava" && (
              <>
                <UploadRegistro title={title} />
                <RegistroSerieNegativa />
              </>
            )}
            {isImprev && <BonusAnnuali />}
          </>
        )}
      </LayoutBase>
      {<Dado clickFunc={estraiNumeroCasuale} />}
    </>
  );
};

export default Prepartita;
