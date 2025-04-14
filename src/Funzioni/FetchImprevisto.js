/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import RimandaImprevisto from "./RimandaImprevisto";
import { supabase } from "../supabaseClient";
import capitalize from "lodash.capitalize";
import pickRandom from "pick-random";
import { numbers } from "./schemi";

const FetchImprevisto = (props) => {
  const { casualeCommunity, titolariRosa } = props;

  const [extractedPlayerCM, setExtractedPlayerCM] = useState([])

  const { id, titolo, descrizione, ultEstrazione, qtGiocatori } =
    casualeCommunity;

  const delElemento = async () => {
    const { error } = await supabase.from("imprevisti").delete().eq("id", id);
    error && console.log(error);
  };
  
  const numbersCM = numbers(titolariRosa)

  
  useEffect(() => {
    setExtractedPlayerCM(
      pickRandom(numbersCM, { count: qtGiocatori }));
    let timeout = setTimeout(() => {
      id !== 0 && delElemento();
      timeout = null;
    }, 3000);
    // Cleanup del timeout per evitare memory leak
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="fetchImprevisto"
      className="flex h-full w-full xl:w-4/5 flex-col items-center justify-between gap-2"
    >
      <h3
        className=" text-6xl mt-6 xl:mt-0 xl:text-4xl font-extrabold uppercase"
      >
        {titolo && titolo}
      </h3>
      <p
        className={`andika-regular w-4/5 xl:w-2/3 flex h-fit items-center justify-center overflow-y-auto px-2 xl:px-4 scrollbar ${
          descrizione && descrizione.length > 200 ? "text-3xl xl:text-lg" : "text-5xl xl:text-2xl"
        }`}
      >
        {capitalize(descrizione)}
      </p>
      {ultEstrazione && (
        <SecondaEstrazioneDiretta
          numbExtrPlayer={qtGiocatori}
          extractedPlayer={extractedPlayerCM}
        />
      )}
      <RimandaImprevisto id={id} titolo={titolo} descrizione={descrizione} />
    </section>
  );
};

export default FetchImprevisto;
