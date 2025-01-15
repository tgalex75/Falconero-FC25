import { useEffect, useState } from "react";
import useFetchData from "../Hooks/useFetchData";
import SecondaEstrazione from "../Components/SecondaEstrazione";
import { supabase } from "../supabaseClient";
import capitalize from "lodash.capitalize";
import { MdOutlineSnooze } from "react-icons/md";
import random from "random";

export default function FetchImprevisto() {
  const { data } = useFetchData("imprevisti");

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      delElemento();
    }, 3000);
  });

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

  const { id, titolo, descrizione, ultEstrazione } = casuale;

  const rimandaImprevisto = async () => {
    const { error } = await supabase
      .from("salvaxdopo")
      .insert([{ id: id, titolo: titolo, descrizione: descrizione }])
      .select();
    error && console.log(error);
    setIsSaved(true);
  };

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
      {ultEstrazione && <SecondaEstrazione />}
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
    </section>
  );
}
