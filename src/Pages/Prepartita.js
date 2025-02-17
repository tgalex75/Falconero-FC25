/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, memo, useEffect } from "react";
import useFetchData from "../Hooks/useFetchData";
import { datiPrepartita } from "../Data/datiPrepartita";
import UploadRegistro from "../Funzioni/UploadRegistro";
import { datiMenoFrequenti } from "../Data/datiMenoFrequenti";
import { datiRari } from "../Data/datiRari";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
import LayoutBase from "../Components/LayoutBase";
import Dado from "../Components/Dado";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import RegistroSerieNegativa from "../Components/RegistroSerieNegativa";
import rnd from "random-weight";
import random from "random"

const Prepartita = () => {
  const { data: dataCommunity, fetchRegistryList } = useFetchData("imprevisti");
  const [casuale, setCasuale] = useState(null);
  const [casualeCommunity, setCasualeCommunity] = useState(null);

  useEffect(() => {
    setCasualeCommunity(dataCommunity?.length > 0 ? random.choice(dataCommunity) : {id: 0, descrizione: "LISTA VUOTA!!!"})
    fetchRegistryList()
  },[casuale])

  // Prima Estrazione
  
  const estraiNumeroCasuale = useCallback(() => {
    const randomDatiPrepartita = rnd(datiPrepartita, (i) => i.weight);
    const randomDatiMenoFrequenti = rnd(datiMenoFrequenti, (i) => i.weight);
    const randomDatiRari = rnd(datiRari, (i) => i.weight);
    const listaEstrazione = [
      { ...randomDatiPrepartita, weight: 3 },
      { ...randomDatiMenoFrequenti, weight: 2 },
      { ...randomDatiRari, weight: 1 },
    ];
    const estratto = rnd(listaEstrazione, (i) => i.weight);
    setCasualeCommunity(dataCommunity.length > 0 ? random.choice(dataCommunity) : {id: 0, descrizione: "LISTA VUOTA!!!"})
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
  
  const FetchImprevistoMemo = memo(FetchImprevisto);
  
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
                  ? "text-5xl font-extrabold uppercase md:relative md:top-2 md:flex-1"
                  : "invisible"
              }
            >
              {isImpCommunity ? "Imprevisto della Community" : "IMPREVISTO!"}
            </h2>
            {!isImpCommunity && (
              <>
                <h3
                  style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
                  className={`text-4xl font-extrabold uppercase flex-1 ${
                    title === "PAROLA ALLA COMMUNITY!" && "invisible"
                  }, ${
                    id === 999 &&
                    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
                  }`}
                >
                  {title}
                </h3>
                <p className="andika-regular mt-4 w-1/2 px-4 text-xl md:flex-1 md:text-2xl">
                  {description && description}
                </p>

                {/* Eccezioni */}
                <p className="andika-regular-italic animate-bounce text-sm font-normal md:text-lg">
                  {notaBene && notaBene}
                </p>
              </>
            )}
            
            {isImpCommunity && <FetchImprevistoMemo casualeCommunity={casualeCommunity} />}

            {ultEstrazione && (
              <SecondaEstrazioneDiretta
                numbExtrPlayer={numbExtrPlayer}
                baseEstrazione={baseEstrazione}
              />
            )}
            {title === "Notte brava" && (
              <>
                <UploadRegistro title={title} />
                <RegistroSerieNegativa />
              </>
            )}
          </>
        )}
      </LayoutBase>
      {<Dado clickFunc={estraiNumeroCasuale} />}
    </>
  );
};

export default Prepartita;
