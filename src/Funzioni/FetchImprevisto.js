import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import capitalize from "lodash.capitalize";

export default function FetchImprevisto() {
  const [imprevisto, setImprevisto] = useState([]);

  useEffect(() => {
    fetchLista();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      delElemento();
    }, 3000);
  });

  const fetchLista = async () => {
    const { data } = await supabase
      .from("random_sort")
      .select("*")
      .limit(1)
      .single();
    setImprevisto(data ? data : { id: 0, descrizione: "LISTA VUOTA!!!" });
  };

  const delElemento = async () => {
    const { error } = await supabase
      .from("imprevisti")
      .delete("id")
      .eq("id", id);
    error && console.log(error);
  };

  const { id, titolo, descrizione } = imprevisto;

  const rimandaImprevisto = async () => {
    const { error } = await supabase
      .from("salvaxdopo")
      .insert([{id: id, titolo: titolo, descrizione: descrizione }])
      .select();
    error && console.log(error);
  };

  return (
    <section
      id="fetchImprevisto"
      className="flex h-2/3 w-4/5 flex-col items-center justify-start gap-6"
    >
      <h3
        style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
        className="text-4xl font-extrabold uppercase"
      >
        {titolo && titolo}
      </h3>
      <p
        className={`andika-regular flex h-fit items-center justify-center overflow-y-auto px-4 scrollbar ${
          descrizione && descrizione.length > 200 ? "text-xl" : "text-3xl"
        }`}
      >
        {capitalize(descrizione)}
      </p>
      <button
        onClick={rimandaImprevisto}
        className="mt-8 h-10 w-1/5 self-end rounded-lg px-2 py-2 text-center text-sm font-bold text-gray-300 shadow-md transition duration-200 ease-in hover:bg-purple-700"
      >
        Posticipa imprevisto?
      </button>
    </section>
  );
}
