/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import RimandaImprevisto from "./RimandaImprevisto";
import { supabase } from "../supabaseClient";
import capitalize from "lodash.capitalize";

const FetchImprevisto = (props) => {
  const { casualeCommunity } = props;

  const { id, titolo, descrizione, ultEstrazione, qtGiocatori, titolariRosa } =
    casualeCommunity;

  const delElemento = async () => {
    const { error } = await supabase.from("imprevisti").delete().eq("id", id);
    error && console.log(error);
  };

  useEffect(() => {
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
        <SecondaEstrazioneDiretta
          numbExtrPlayer={qtGiocatori}
          baseEstrazione={titolariRosa}
        />
      )}
      <RimandaImprevisto id={id} titolo={titolo} descrizione={descrizione} />
    </section>
  );
};

export default FetchImprevisto;
