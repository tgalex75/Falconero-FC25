import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import { MdClear } from "react-icons/md";
import useFetchData from "../Hooks/useFetchData";

const SalvaPerDopo = () => {
  const { data: vociRegistro, fetchRegistryList } = useFetchData("salvaxdopo");

  const removeVociRegistro = async (element) => {
    const { error } = await supabase
      .from("salvaxdopo")
      .delete()
      .eq("id", element);
    error && console.log(error);
    fetchRegistryList();
  };
  
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-12 p-4 font-bold">
      <h1>Imprevisti Sospesi</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="h-full w-full items-center gap-2 overflow-hidden rounded-lg bg-black/50 p-2 text-gray-300 md:flex"
      >
        <div className="flex h-full w-full flex-col gap-2">
          <h3 className="text-center uppercase text-[--clr-ter]">
            Imprevisti della Community in Attesa di Essere Risolti
          </h3>
          <strong className="absolute right-1 top-0 font-semibold">
            # {vociRegistro.length}
          </strong>
          <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto px-2 pb-2">
            {vociRegistro.map((el) => (
              <li
                key={el.id}
                className="flex items-center justify-between bg-gray-700/20 even:bg-gray-500/20 py-1 ps-2 text-left text-sm font-semibold uppercase"
              >
                <span className="w-1/6">{el.titolo}</span>
                <span className="w-5/6 pe-2">{el.descrizione}</span>
                <MdClear
                  size={20}
                  className="cursor-pointer fill-red-700 transition-all hover:scale-125 hover:fill-red-600"
                  onClick={() => removeVociRegistro(el.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default SalvaPerDopo;
