import React from "react";
import { motion } from "framer-motion";
import { MdClear } from "react-icons/md";

const RegistroMercato = (props) => {
  const { vociRegistro, deleteListDB, removeVociRegistro } =
    props;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="absolute left-1 top-1/2 hidden h-[99%] w-[20vw] -translate-y-1/2 flex-col items-center justify-between overflow-hidden rounded-lg bg-black/50 pt-2 text-gray-300 md:flex md:flex-col"
    >
      <h6 className="uppercase text-[--clr-prim]">Registro Giocatori</h6>
      <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto px-2 pb-2 mt-2">
        {vociRegistro.map((el) => (
          <li
            key={el.id}
            className="flex items-center justify-between bg-gray-700/20 ps-1 text-left text-[0.7rem] uppercase"
          >
            <span className="w-1/2">{el.name}</span>
            <span className="w-1/2">{el.description}</span>
            <MdClear
              size={18}
              className="cursor-pointer fill-red-700 transition-all hover:scale-125 hover:fill-red-600"
              onClick={() => removeVociRegistro(el.id)}
            />
          </li>
        ))}
      </ul>
      <button className="block h-8 w-full bg-purple-700" onClick={deleteListDB}>
        Resetta lista
      </button>
    </motion.div>
  );
};

export default RegistroMercato;
