import { useContext } from "react";
import { motion } from "framer-motion";
import { MdClear } from "react-icons/md";
import { CartContext } from "../context/regContext";

const RegistroRiepilogo = () => {

  const { cartItems, removeItem } = useContext(CartContext);

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-12 p-4 font-bold">
      <h1>Registro Giocatori</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="h-full w-full items-center gap-2 overflow-hidden rounded-lg bg-black/50 p-4 text-gray-300 md:flex md:flex-col"
      >
        <h4 className="text-[--clr-ter] font-semibold">Imprevisti Serie Negativa</h4>
        <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto border px-2 pb-2">
          {cartItems.map((el) => (
            <li
              key={el.id}
              className="flex items-center justify-between bg-gray-700/20 py-1 ps-2 text-left text-sm uppercase"
            >
              {el.title} - {el.quantity}
              <MdClear
                size={20}
                className="cursor-pointer fill-red-700 transition-all hover:scale-125 hover:fill-red-600"
                onClick={() => removeItem(el)}
              />
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default RegistroRiepilogo;
