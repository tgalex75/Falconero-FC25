import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { CartContext } from "../context/regContext";

const RegistroSerieNegativa = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="absolute bottom-1 left-1 top-1 hidden h-[98%] w-[24vw] items-center gap-2 overflow-hidden rounded-lg bg-black/90 text-gray-300 md:flex md:flex-col"
    >
      <h6 className="uppercase text-[--clr-prim]">Registro Giocatori</h6>
      <AnimatePresence initial={false} mode="popLayout">
        <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto px-1 pb-2">
          {cartItems.map((item) => (
            <motion.div
              layout={true}
              initial={{ opacity: 0, y: -300 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
              style={
                item.quantity > 2
                  ? { backgroundColor: "orange", color: "black" }
                  : {}
              }
              className="flex items-center justify-between bg-gray-700/20 ps-1 text-left text-[0.6rem] uppercase"
              key={item.id}
            >
              <small className="text-xs font-semibold uppercase md:text-sm">
                {item.title}
              </small>
              <div className="flex items-center pr-2">
                <MdAddCircleOutline
                  size={18}
                  style={item.quantity > 2 ? { visibility: "hidden" } : {}}
                  className="rounded-full hover:scale-110"
                  onClick={() => {
                    addToCart(item);
                  }}
                />
                <small className="mx-2 text-lg font-bold uppercase">
                  {item.quantity >= 3 ? 3 : item.quantity}
                </small>
                <MdRemoveCircleOutline
                  onClick={() => {
                    removeFromCart(item);
                  }}
                  size={18}
                  className="rounded-full hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </ul>
      </AnimatePresence>
      <button className="block h-8 w-full bg-purple-700/60" onClick={clearCart}>
        Resetta lista
      </button>
    </motion.div>
  );
};

export default RegistroSerieNegativa;
