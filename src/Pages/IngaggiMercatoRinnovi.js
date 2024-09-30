import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Dado from "../Components/Dado";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import RegistroGiocatori from "../Components/RegistroGiocatori";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { MdArrowForward } from "react-icons/md";
import BonusAnnuali from "../Components/BonusAnnuali";

const IngaggiMercatoRinnovi = (props) => {
  const [casuale, setCasuale] = useState(null);

  const estraiNumeroCasuale = () => {
    setCasuale(Math.floor(Math.random() * 10) + 1);
  };

  const isImpr = casuale === 7;

  const inputRef = useRef(null);

  const [vociRegistro, setVociRegistro] = useState([]);

  const tipoImprevisto = props.tipoImprevisto;

  const listaMsgImprevisto = [
    {
      tipo: "Rinnovi",
      msgIsImpr: "Mercenario",
      msgNoImpr: "Trattativa Libera",
      descrIsImpr: "Raddoppia l'ingaggio o cessione obbligatoria",
      descrNoImpr: "Gestisci la trattativa liberamente",
      linkTo: "/rinnovi",
      linkDesc: "Imprevisti Rinnovi",
    },
    {
      tipo: "Mercato",
      msgIsImpr: "Mercenario",
      msgNoImpr: "Bilancio in Ordine",
      descrIsImpr: "Accetta l'offerta o raddoppia l'ingaggio appena possibile",
      descrNoImpr: "Totale libertà di scelta",
      linkTo: "/offerte-mercato",
      linkDesc: "Imprevisti Calciomercato",
    },
    {
      tipo: "Ingaggio",
      msgIsImpr: "Visite non superate",
      msgNoImpr: "Visite OK",
      descrIsImpr:
        "La trattativa salta e non può essere ritentata fino alla prossima finestra di mercato.",
      descrNoImpr: "La trattativa viene chiusa senza conseguenze.",
      linkTo: "/ingaggio",
      linkDesc: "Imprevisti di Ingaggio",
    },
  ];

  const msgImprevisto = listaMsgImprevisto.filter(
    (el) => el.tipo === tipoImprevisto,
  );

  const { msgNoImpr, msgIsImpr, descrIsImpr, descrNoImpr } = msgImprevisto[0];

  const linksRapidi = listaMsgImprevisto.filter(
    (el) => el.tipo !== tipoImprevisto,
  );

  useEffect(() => {
    fetchRegistryList();
  }, [vociRegistro]);

  const fetchRegistryList = async () => {
    const { data } = await supabase.from("registroo").select("*");
    setVociRegistro(data ? data : []);
  };

  const uploadListDB = async (list) => {
    const { data, error } = await supabase
      .from("registroo")
      .insert([
        {
          id: list.id,
          name: list.name,
          description: list.description,
          tipo: list.tipo,
        },
      ])
      .select();
    data ? console.log() : console.log("error: ", error);
  };

  const deleteListDB = async () => {
    const { error } = await supabase
      .from("registroo")
      .delete("name")
      .neq("name", null);
    error && console.log(error);
  };

  const removeVociRegistro = async (element) => {
    const { error } = await supabase
      .from("registroo")
      .delete()
      .eq("id", element);
    error && console.log(error);
  };

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-around gap-2 px-4 py-6 font-bold md:p-8">
      <h1>{isMobile ? tipoImprevisto : `Imprevisti ${tipoImprevisto}`}</h1>
      {/* BOX PRIMA ESTRAZIONE */}
      <motion.div
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        key={casuale}
        id="containerPrimaEstrazione"
        style={isImpr ? { color: "var(--clr-ter)" } : {}}
        className="flex h-full w-full select-none flex-col items-center justify-around rounded-xl bg-black/50 px-4 pb-4 text-center shadow-lg ring ring-inset ring-white/75 md:px-10 md:pb-8"
      >
        {!casuale && (
          <h2
            style={{ fontFamily: "'Handlee', cursive" }}
            className="text-5xl italic"
          >
            Lancia il dado...
          </h2>
        )}
        {casuale && (
          <>
            <h2
              style={{
                fontFamily: "'Boogaloo', sans-serif",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className={
                isImpr
                  ? "text-5xl font-extrabold uppercase md:text-7xl"
                  : "hidden"
              }
            >
              imprevisto!
            </h2>
            <h3
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="text-4xl font-extrabold uppercase md:text-6xl"
            >
              {isImpr ? msgIsImpr : msgNoImpr}
            </h3>
            <p
              style={{
                fontFamily: "'Handlee', cursive",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className="mt-4 px-4 text-2xl md:w-3/5 md:text-4xl"
            >
              {isImpr ? descrIsImpr : descrNoImpr}
            </p>
            {/* Pulsanti per inserimento nome giocatore nel registro */}
            <div className="hidden text-start md:flex md:w-1/3 md:flex-col">
              <label
                htmlFor="nome-giocatore"
                className="mb-1 inline-block text-xs text-gray-300 md:text-sm"
              >
                Giocatore da annotare nel registro
              </label>
              <div className="hidden items-center justify-between gap-2 md:flex">
                <input
                  ref={inputRef}
                  type="text"
                  id="nome-giocatore"
                  className="h-10 w-1/2 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-2 py-2 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  name="nomeGiocatore"
                  placeholder="Nome del giocatore"
                />
                <button
                  type="button"
                  className="h-10 w-1/2 rounded-lg bg-sky-700 px-2 py-2 text-center text-sm font-bold text-gray-300 shadow-md transition duration-200 ease-in hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
                  onClick={() =>
                    uploadListDB({
                      id: uuidv4(),
                      name: inputRef.current.value,
                      description: isImpr ? msgIsImpr : msgNoImpr,
                      tipo: tipoImprevisto,
                    })
                  }
                >
                  Aggiungi al Registro
                </button>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="absolute right-1 top-1 hidden h-auto w-[20vw] items-start gap-2 overflow-hidden rounded-lg bg-black/50 px-2 pt-2 pb-4 mb-2 uppercase text-gray-300 md:flex md:flex-col"
            >
              <h6 className="uppercase text-[--clr-prim] self-center">
                Links Rapidi
              </h6>

              {linksRapidi.map((el, i) => {
                return (
                  <motion.div
                    whileHover={{ x: ".5rem" }}
                    transition={{
                      type: "spring",
                      duration: 0.4,
                      ease: "easeIn",
                    }}
                    key={i}
                    className="flex w-full items-center justify-start gap-4 hover:text-[--clr-ter]"
                  >
                    <MdArrowForward />
                    <Link to={el.linkTo}>{el.linkDesc}</Link>
                  </motion.div>
                );
              })}
              <motion.div
                    whileHover={{ x: ".5rem" }}
                    transition={{
                      type: "spring",
                      duration: 0.4,
                      ease: "easeIn",
                    }}
                    key="prepartita"
                    className="flex w-full items-center justify-start gap-4 hover:text-[--clr-ter]"
                  >
                    <MdArrowForward />
                    <Link to="/prepartita">Prepartita</Link>
                  </motion.div>
            </motion.div>
            <BonusAnnuali />
          </>
        )}
        <RegistroGiocatori
          vociRegistro={vociRegistro}
          deleteListDB={deleteListDB}
          removeVociRegistro={removeVociRegistro}
          tipoImprevisto={tipoImprevisto}
        />
      </motion.div>

      {Dado(estraiNumeroCasuale)}
    </section>
  );
};

export default IngaggiMercatoRinnovi;
