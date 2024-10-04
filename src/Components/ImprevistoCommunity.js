import React, { useState } from "react";
import FetchData from "../Funzioni/FetchData";
import logoSfondo from "../assets/imgs/falco_nocornice.png";
import { motion } from "framer-motion";

const ImprevistoCommunity = (props) => {
  const [showModal, setShowModal] = useState(true);

  const changeModalState = () => {
    setShowModal((prevModal) => !prevModal);
  };

  return (
    showModal && (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.2, type: "spring" }}
        style={{
          backgroundPositionX: "-30%",
          backgroundPositionY: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${logoSfondo})`,
        }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1200] flex md:p-8 -mt-6 h-[90vh] w-[95vw] md:w-screen flex-col items-center justify-center gap-4 rounded-xl border-2 md:border-4 border-[--clr-ter] bg-gray-800 uppercase text-[--clr-ter]"
      >
        <h3
          style={{
            fontFamily: "'Anton', sans-serif",
            filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
          }}
          className="text-2xl md:text-5xl"
        >
          Imprevisto della Community{" "}
        </h3>
        <FetchData changeModalState={changeModalState} />
      </motion.section>
    )
  );
};

export default ImprevistoCommunity;
