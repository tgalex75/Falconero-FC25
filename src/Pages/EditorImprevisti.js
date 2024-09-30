import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import { MdClear } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export default function EditorImprevisti() {
  const [listaImprevisto, setListaImprevisto] = useState([]);
  const inputRef = useRef(null);
  const focusRef = useRef(null);

  useEffect(() => {
    fetchLista();
  }, [listaImprevisto]);

  const fetchLista = async () => {
    let { data: imprevisti, error } = await supabase
      .from("imprevisti")
      .select("*");
    setListaImprevisto(
      imprevisti ? imprevisti : { id: 0, name: "LISTA VUOTA!!!" },
    );
    error && console.log(error);
  };

  const filtraImprevisti = (id) => {
    setListaImprevisto(listaImprevisto.filter((el) => el.id !== id));
  };

  const delElemento = async (id) => {
    const { error } = await supabase
      .from("imprevisti")
      .delete("id")
      .eq("id", id);
    error && console.log("error: ", error);
    filtraImprevisti(id);
  };

  const insertItem = async (obj) => {
    const { error } = await supabase.from("imprevisti").insert([
      {
        name: obj.name,
      },
    ]);
    error && console.log("error: ", error);
    setListaImprevisto([...listaImprevisto, { ...obj }]);
  };

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-between gap-2 px-4 py-6 font-bold md:p-8 md:py-16">
      <h1>Editor degli Imprevisti</h1>
      <main className="flex h-4/5 w-full flex-col-reverse gap-1 overflow-y-auto bg-black/30 p-4 text-sm font-medium">
        <AnimatePresence initial={false} mode="popLayout" >
          {listaImprevisto.map((el) => {
            return (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
                key={el.id}
                
                className="flex w-full items-center justify-between bg-black/20 odd:bg-black/30 p-1"
              >
                {/* <p className="min-h-fit w-fit">{el.id}</p> */}
                <p className="h-auto flex-1">{el.name}</p>
                <MdClear
                  size={18}
                  className="cursor-pointer fill-[--clr-ter] transition-all hover:scale-125 hover:fill-yellow-200"
                  onClick={() => delElemento(el.id)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </main>
      <div>

      <form
        className="relative mb-3 flex w-3/4 flex-col items-center gap-2 p-2"
        data-te-input-wrapper-init
        >
        <label
          htmlFor="customImpr"
          className="peer-focus:text-primary dark:peer-focus:text-primary pointer-events-none left-3 top-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] text-xs leading-[1.6] text-gray-300 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200"
        >
          Scrivi il tuo imprevisto
        </label>
        <textarea
          className="peer block min-h-[auto] w-full rounded border bg-black/30 px-3 py-[0.32rem] font-medium leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="customImpr"
          rows="2"
          ref={inputRef}
          placeholder="Scrivi il tuo imprevisto..."
        ></textarea>
      </form>
      <button
        className="w-24 rounded-lg bg-orange-700 px-6 py-2 drop-shadow-2xl hover:bg-orange-600"
        type="button"
        onClick={() =>
          insertItem({
            name: inputRef.current.value,
            id: 500 + listaImprevisto.length,
          })
        }
        >
        Invia
      </button>
        </div>
    </section>
  );
}
