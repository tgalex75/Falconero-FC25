/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from "react";
import useFetchData from "../Hooks/useFetchData";
import { supabase } from "../supabaseClient";
import { datiPrepartita } from "../Data/datiPrepartita";
import UploadRegistro from "../Funzioni/UploadRegistro";
import { datiMenoFrequenti  } from "../Data/datiMenoFrequenti";
import { datiRari } from "../Data/datiRari";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
import LayoutBase from "../Components/LayoutBase";
import Dado from "../Components/Dado";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import RegistroSerieNegativa from "../Components/RegistroSerieNegativa";
import random from "random";
import rnd from "random-weight";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineSnooze } from "react-icons/md";

const Prepartita = () => {
  const [casuale, setCasuale] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Prima Estrazione
  const randomDatiPrepartita = rnd(datiPrepartita, i => i.weight)
  const randomDatiMenoFrequenti = rnd(datiMenoFrequenti, i => i.weight)
  const randomDatiRari = rnd(datiRari, i => i.weight)

  const listaEstrazione = [
    { ...randomDatiPrepartita, weight: 3 },
    { ...randomDatiMenoFrequenti, weight: 2 },
    { ...randomDatiRari, weight: 1 },
  ];

  const estraiNumeroCasuale = useCallback(() => {
    const estratto = rnd(listaEstrazione, (i) => i.weight);
    setCasuale(estratto);
    setIsSaved(false);
  });
  console.log(casuale?.title);
  
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

  // Estrazione Community
  const { data } = useFetchData("imprevisti");
  
  const casualeCommunity = random.choice(data) || {
    id: 0,
    descrizione: "LISTA VUOTA!!!",
  };
  
  
  const {
    id: idCM,
    titolo,
    descrizione,
    ultEstrazione: ultEstrazioneCM,
    qtGiocatori,
    titolariRosa,
  } = casualeCommunity;  

  const delElemento = async () => {
    const { error } = await supabase
      .from("imprevisti")
      .delete("id")
      .eq("id", idCM);
    error && console.log(error);
  };

  useEffect(()=> {

    isImpCommunity &&
      setTimeout(() => {
        delElemento();
      }, 3000);
  },[isImpCommunity]) 

  // Rimanda Imprevisto


  const rimandaImprevisto = async () => {
    const { error } = await supabase
      .from("salvaxdopo")
      .insert([{ id: isImpCommunity ? idCM : uuidv4(), titolo: isImpCommunity ? titolo : title, descrizione: isImpCommunity ? descrizione : description }])
      .select();
    error && console.log(error);
    setIsSaved(true);
  };

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
                <p className="andika-regular mt-4 w-1/2 px-4 text-xl md:flex-1 md:text-2xl">
                  {description && description}
                </p>

                {/* Eccezioni */}
                <p className="andika-regular-italic animate-bounce text-sm font-normal md:text-lg">
                  {notaBene && notaBene}
                </p>
              </>
            ) : (
              <>
                <FetchImprevisto
                  titolo={titolo}
                  descrizione={descrizione}
                  ultEstrazione={ultEstrazioneCM}
                  qtGiocatori={qtGiocatori}
                  titolariRosa={titolariRosa}
                />
              </>
            )}
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
        {/* SALVA PER DOPO */}
        {isImprev && (
          <>
            <button
              onClick={rimandaImprevisto}
              className="peer rounded-full p-2 text-center text-sm font-bold shadow-md transition duration-200 ease-in hover:scale-125 hover:bg-purple-700 hover:text-gray-300"
            >
              <MdOutlineSnooze size={36} />
            </button>
            {!isSaved ? (
              <span className="invisible text-xs transition-all duration-150 ease-in-out peer-hover:visible">
                Posticipa e salva imprevisto?
              </span>
            ) : (
              <span className="text-xs transition-all duration-150 ease-in-out">
                Imprevisto posticipato e salvato!
              </span>
            )}
          </>
        )}
      </LayoutBase>
      {<Dado clickFunc={estraiNumeroCasuale} />}
    </>
  );
};

export default Prepartita;
