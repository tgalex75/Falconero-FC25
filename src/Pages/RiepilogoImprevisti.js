import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import { MdClear } from "react-icons/md";
import {datiPrepartita} from "../Data/datiPrepartita";
import {datiMenoFrequenti} from "../Data/datiMenoFrequenti";
import datiSettimana from "../Data/datiSettimana";
import useFetchData from "../Hooks/useFetchData";

const RiepilogoImprevisti = () => {
  const {data : vociRegistro, fetchRegistryList} = useFetchData("imprevisti")

  const removeVociRegistro = async (element) => {
    const { error } = await supabase
      .from("imprevisti")
      .delete()
      .eq("id", element);
    error && console.log(error);
    fetchRegistryList()
  };

  const datiPrepartitaGlobali = [...datiPrepartita, ...datiMenoFrequenti]

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 font-bold">
      <h1>Riepilogo Imprevisti</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="h-full w-full items-center gap-2 overflow-y-auto rounded-lg bg-black/50 p-2 text-gray-300 flex flex-col"
      >
          <h3 className="text-center uppercase text-[--clr-ter]">
            Imprevisti Prepartita
          </h3>
          <ul className="flex h-fit w-full flex-col gap-1 px-2 pb-2">
            {datiPrepartitaGlobali.map(
              (el) =>
                el.title.toUpperCase() !== "NESSUN IMPREVISTO" && (
                  <li
                    key={el.id}
                    className="flex items-center justify-start gap-2 bg-gray-700/20 py-1 ps-2 text-left text-sm"
                  >
                    <strong className="uppercase">{el.title}</strong>
                    <em className="font-medium">{el.description}</em>
                  </li>
                ),
            )}
          </ul>
          <h3 className="text-center uppercase text-[--clr-ter]">
            Imprevisti Settimana
          </h3>
          <ul className="flex h-fit w-full flex-col gap-1 px-2 pb-2">
            {datiSettimana.map(
              (el) =>
                el.title.toUpperCase() !== "NESSUN IMPREVISTO" && (
                  <li
                    key={el.id}
                    className="flex items-center justify-start gap-2 bg-gray-700/20 py-1 ps-2 text-left text-sm"
                  >
                    <strong className="uppercase">{el.title}</strong>
                    <em className="font-medium">{el.description}</em>
                  </li>
                ),
            )}
          </ul>
          <h3 className="text-center uppercase text-[--clr-ter]">
            Imprevisti della Community
          </h3>
          <strong className="absolute right-1 top-0 font-semibold">
            # {vociRegistro.length}
          </strong>
          <ul className="flex h-fit w-full flex-col gap-1 px-2 pb-2">
            {vociRegistro.map((el) => (
              <li
                key={el.id}
                className="flex items-center justify-between bg-gray-700/20 py-1 ps-2 text-left text-sm font-normal uppercase"
              >
                <span className="w-[95%]">{el.descrizione}</span>
                <MdClear
                  size={20}
                  className="cursor-pointer fill-red-700 transition-all hover:scale-125 hover:fill-red-600"
                  onClick={() => removeVociRegistro(el.id)}
                />
              </li>
            ))}
          </ul>
      </motion.div>
    </section>
  );
};

export default RiepilogoImprevisti;
