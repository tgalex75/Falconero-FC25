import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";

const BonusAnnuali = () => {
  const [vociBonus, setVociBonus] = useState([]);
  
  const limiteRaggiunto = vociBonus.length > 2;

  useEffect(() => {
    fetchLista();
  }, []);

  const fetchLista = async () => {
    const { data } = await supabase.from("bonus-annuali").select("*");
    setVociBonus(data ? data : []);
  };

  const uploadListDB = async (list) => {
    const { error } = await supabase
      .from("bonus-annuali")
      .insert([{ id: list.id }])
      .select();
    error && console.log("error: ", error);
    fetchLista();
  };

  const deleteListDB = async () => {
    const { error } = await supabase
      .from("bonus-annuali")
      .delete("id")
      .lt("id", 4);
    error && console.log(error);
    fetchLista();
  };

  const addVociBonus = (element) => {
    setVociBonus([...vociBonus, { ...element }]);
    uploadListDB(element);
    fetchLista();
  };

  const azzeraVociBonus = () => {
    setVociBonus([]);
    deleteListDB();
    fetchLista();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="xl:absolute xl:right-1 xl:top-1 mb-4 xl:mb-0 xl:mt-2 xl:h-1/4 h-40 w-3/4 xl:w-[20vw] items-center justify-between overflow-hidden rounded-lg bg-black/50 xl:bg-black/20 p-2 uppercase text-gray-300 flex flex-col"
    >
      <h6 className="font-bold uppercase text-[--clr-prim]">Bonus Annuali</h6>
      <section className="flex w-full items-center justify-around gap-4 xl:gap-1 xl:p-1">
        {vociBonus.map((item) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: -1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="flex h-full w-1/3 items-center justify-center rounded p-2 xl:py-1"
            key={item.id}
          >
            <div className="flex min-h-full w-full xl:flex-col p-2 text-[--clr-sec] items-center justify-center rounded-t-lg bg-[--clr-ter] text-center">
              <h3 className="mx-2 text-xl font-bold uppercase xl:text-base">
                {item.id}
              </h3>
            </div>
          </motion.div>
        ))}
      </section>
      <div className="flex h-1/3 w-full items-center justify-between gap-2 px-4 text-[.8rem] font-semibold">
        <button
          type="button"
          className="flex h-3/4 w-full items-center justify-center rounded border border-purple-700 px-3 text-center text-white shadow-md transition duration-200 ease-in hover:bg-purple-700"
          style={limiteRaggiunto ? { pointerEvents: "none", opacity: 0.3 } : {}}
          onClick={() =>
            addVociBonus({
              id: vociBonus.length + 1,
            })
          }
        >
          Aggiungi Bonus
        </button>
        <button
          type="button"
          className="flex h-3/4 w-full items-center justify-center rounded border border-red-700 px-3 text-center text-white shadow-md transition duration-200 ease-in hover:bg-red-700"
          onClick={azzeraVociBonus}
        >
          Azzera
        </button>
      </div>
    </motion.div>
  );
};

export default BonusAnnuali;
