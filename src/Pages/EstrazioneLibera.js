import { motion } from "framer-motion";
import  random  from "random";
import SecondaEstrazione from "../Components/SecondaEstrazione"

const EstrazioneLibera = () => {
  const titoloH1 = "Estrazione Libera";

  return (
    <section className="flex h-dvh w-full select-none flex-col items-center justify-start gap-2 px-4 py-6 font-bold xl:justify-around md:p-8">
      <h1>{titoloH1}</h1>
      <motion.div
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        key={random.float()}
        id="containerPrimaEstrazione"
        className="flex h-1/2 xl:h-full w-full select-none flex-col items-center justify-around gap-4 rounded-xl bg-black/30 px-4 py-2 text-center shadow-lg ring ring-inset ring-white/75 md:justify-evenly md:gap-2 md:px-10"
      >
        <SecondaEstrazione />
</motion.div>
    </section>
  );
};

export default EstrazioneLibera;
