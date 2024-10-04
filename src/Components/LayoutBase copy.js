import React from "react";
import { motion } from "framer-motion";
import  random  from "random";

const LayoutBase = ({ titoloH1, isImprev, casuale, children }) => {
  return (
    <section
      className="flex h-[100dvh] w-full select-none flex-col items-center justify-start gap-2 font-bold md:justify-around p-2"
      /* style={
        !casuale
          ? { justifyContent: "space-around" }
          : { justifyContent: "space-around" }
      } */
    >
      {/* BOX PRIMA ESTRAZIONE */}
      <motion.div
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        key={random.float()}
        id="containerPrimaEstrazione"
        style={isImprev && { color: "var(--clr-ter)" }}
        className="flex h-full w-full select-none flex-col relative items-center gap-6 rounded-xl bg-black/50 px-4 py-2 text-center shadow-lg ring ring-inset ring-white/75 md:justify-evenly md:gap-2 md:px-10"
      >
      <h1 className="-rotate-90 absolute top-48 -right-12 opacity-20 px-6 text-gray-200">{titoloH1}</h1>
        {!casuale && (
          <h2 className="andika-regular-italic flex h-full items-center justify-center text-5xl italic">
            Buzzzz it!...
          </h2>
        )}
        {children}
      </motion.div>
    </section>
  );
};

export default LayoutBase;
