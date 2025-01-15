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
    const { data, error } = await supabase
      .from("bonus-annuali")
      .insert([{ id: list.id }])
      .select();
    data ? console.log("data: ", data) : console.log("error: ", error);
    fetchLista();
  };

  const deleteListDB = async () => {
    const { error } = await supabase
      .from("bonus-annuali")
      .delete("id")
      .lt("id", 4);
    console.log(error);
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
      className="absolute right-1 top-36 mt-2 hidden h-2/5 w-[20vw] items-center justify-between overflow-hidden rounded-lg bg-black/50 p-2 uppercase text-gray-300 md:flex md:flex-col"
    >
      <h6 className="font-bold uppercase text-[--clr-prim]">Bonus Annuali</h6>
      <section className="flex w-full items-center justify-around gap-1 p-1">
        {vociBonus.map((item) => (
          <motion.div
            //layout
            initial={{ opacity: 0, y: -1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="flex h-full w-1/3 items-center justify-center rounded py-1"
            key={item.id}
          >
            <div className="flex min-h-full w-full flex-col items-center justify-center rounded-t-lg bg-orange-600/95 text-center">
              <h6 className="text-[.6rem]">Bonus</h6>
              <h3 className="mx-2 text-sm font-bold uppercase md:text-sm">
                {item.id}
              </h3>
            </div>
          </motion.div>
        ))}
      </section>
      <div className="flex h-1/6 w-full items-center justify-between gap-2 px-4 text-[.8rem] font-semibold">
        <button
          type="button"
          className="flex h-5/6 w-full items-center justify-center rounded border border-sky-700 px-3 text-center text-white shadow-md transition duration-200 ease-in hover:bg-purple-700"
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
          className="flex h-5/6 w-full items-center justify-center rounded border border-[--clr-prim] px-3 text-center text-white shadow-md transition duration-200 ease-in hover:bg-[--clr-prim]"
          onClick={azzeraVociBonus}
        >
          Azzera
        </button>
      </div>
    </motion.div>
  );
};

export default BonusAnnuali;
