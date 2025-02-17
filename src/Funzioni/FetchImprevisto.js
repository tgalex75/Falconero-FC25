/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, memo } from "react";
import useFetchData from "../Hooks/useFetchData";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import RimandaImprevisto from "./RimandaImprevisto";
import { supabase } from "../supabaseClient";
import capitalize from "lodash.capitalize";
import random from "random";

const FetchImprevisto = () => {
  const { data } = useFetchData("imprevisti") 
  
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      delElemento();
    }, 3000);
    // Cleanup del timeout per evitare memory leak
    return () => clearTimeout(timeout);
},[]);

  const delElemento = async () => {
    const { error } = await supabase
      .from("imprevisti")
      .delete("id")
      .eq("id", id);
    error && console.log(error);
  };

  const casuale = random.choice(data) || {
    id: 0,
    descrizione: "LISTA VUOTA!!!",
  };

  const { id, titolo, descrizione, ultEstrazione, qtGiocatori, titolariRosa } =
    casuale;
  
  const SecondaEstrazioneDirettaMemo = memo(SecondaEstrazioneDiretta)

  return (
    <section
      id="fetchImprevisto"
      className="flex h-full w-4/5 flex-col items-center justify-between gap-2"
    >
      <h3
        style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
        className="text-4xl font-extrabold uppercase"
      >
        {titolo && titolo}
      </h3>
      <p
        className={`andika-regular flex h-fit items-center justify-center overflow-y-auto px-4 scrollbar ${
          descrizione && descrizione.length > 200 ? "text-lg" : "text-2xl"
        }`}
      >
        {capitalize(descrizione)}
      </p>
      {ultEstrazione && (
        <SecondaEstrazioneDirettaMemo
          numbExtrPlayer={qtGiocatori}
          baseEstrazione={titolariRosa}
        />
      )}
      <RimandaImprevisto id={id} titolo={titolo} descrizione={descrizione} />
    </section>
  );
};

export default FetchImprevisto;
